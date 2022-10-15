import useScrollPosition from '@react-hook/window-scroll'
import React from 'react'
import { useState } from 'react'
import { Text } from 'rebass'
import { NavLink , useLocation} from 'react-router-dom'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'

// import Logo from '../../assets/logo'

import { useActiveWeb3React } from '../../hooks/web3'
import { useETHBalances } from '../../state/wallet/hooks'
import { BridgeMenu } from '../Menu/BridgeMenu'
import { MobileMenu } from '../Menu/MobileMenu'

// import { ExternalLink } from '../../theme'

import { YellowCard } from '../Card'
import Menu from '../Menu'

import Row, { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
// import Modal from '../Modal'
// import UniBalanceContent from './UniBalanceContent'
import { ChainId } from 'constants/chains'
import TycheLogo from '../../assets/svg/logo.svg'
import { ExternalLink } from 'theme/components'

const Logo = styled.img`
  height: 30px;
`

const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 21;
  position: relative;

  /* Background slide effect on scroll. */
  background-image: ${({ theme }) => `linear-gradient(to bottom, transparent 50%, ${theme.bg0} 50% )}}`}
  background-position: ${({ showBackground }) => (showBackground ? '0 -100%' : '0 0')};
  background-size: 100% 200%;
  box-shadow: 0px 0px 0px 1px ${({ theme, showBackground }) => (showBackground ? theme.bg2 : 'transparent;')};
  transition: background-position 0.1s, box-shadow 0.1s;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding:  1rem;
    grid-template-columns: 120px 1fr;

  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 1rem;
  `}
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.bg1};
    backdrop-filter: blur(4px) brightness(50%) saturate(150%);
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row-reverse;
    align-items: center;
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`

const HeaderLinks = styled(Row)`
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.darkTransparent2} 0%, ${theme.secondary1_10} 50%, ${theme.darkTransparent2} 100%);`};
  border: 1px solid rgba(12, 92, 146, 0.7);
  box-shadow: 0 0 5px rgba(39, 210, 234, 0.2), 0 0 7px rgba(39, 210, 234, 0.2);
  margin-left: 4%;
  width: fit-content;
  padding: 4px;
  border-radius: 10px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  overflow: auto;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    justify-self: flex-end;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.darkTransparent2} 0%, ${theme.secondary1_10} 50%, ${theme.darkTransparent2} 100%);`};
  border-radius: 8px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;
  border: 1px solid rgba(12, 92, 146, 0.3);
  box-shadow: 0 0 5px rgba(39, 210, 234, 0.1), 0 0 7px rgba(39, 210, 234, 0.1);

  :focus {
    border: 1px solid blue;
  }
`

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const HideLarge = styled.span`
  @media screen and (min-width: 700px) {
    display: none !important;
  }
`

const NetworkCard = styled(YellowCard)`
  border-radius: 8px;
  padding: 8px 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
  padding: 8px 12px;

  &.${activeClassName} {
    border-radius: 0px;
    font-weight: 800;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName,
})<{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 0px;
    font-weight: 800;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    text-decoration: none;
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      display: none;
`}
`

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg2};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

const NETWORK_LABELS: Record<ChainId, string> = {
  [ChainId.TESTNET]: 'Evmos Testnet',
  [ChainId.MAINNET]: 'Evmos',
  [ChainId.RINKEBY]: 'Rinkeby',
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  // const [isBridgeOpen, setIsBridgeOpen] = useState(false)

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  // const [isDark] = useDarkModeManager()

  // const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)

  const scrollY = useScrollPosition()
    // const [menu, setMenu] = useState(false)
    const [collapsemenu, setCollapseMenu] = useState(false)

    //assigning location variable
    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

  return (
    <>
    <HeaderFrame showBackground={scrollY > 45}>
      {/* <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
        <UniBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
      </Modal> */}
      <HeaderRow>
        <Title href=".">
          <Logo src={TycheLogo} />
        </Title>
      </HeaderRow>
      <HideSmall>
        <HeaderLinks>
          <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
            {t('swap')}
          </StyledNavLink>
          <StyledNavLink
            id={`pool-nav-link`}
            to={'/pool'}
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/add') ||
              pathname.startsWith('/remove') ||
              pathname.startsWith('/increase') ||
              pathname.startsWith('/find')
            }
          >
            {t('pool')}
          </StyledNavLink>
          <StyledNavLink
            id={`assets-nav-link`}
            to={'/assets'}
            isActive={(match, { pathname }) => Boolean(match) || pathname.startsWith('/assets')}
          >
            {t('Assets')}
          </StyledNavLink>
          <StyledNavLink
            id={`farm-nav-link`}
            to={'/farm'}
            isActive={(match, { pathname }) => Boolean(match) || pathname.startsWith('/farm')}
          >
            {t('Farm')}
          </StyledNavLink>
          <StyledNavLink
            id={`stake-nav-link`}
            to={'/stake'}
            isActive={(match, { pathname }) => Boolean(match) || pathname.startsWith('/stake')}
          >
            {t('Stake')}
          </StyledNavLink>
          <BridgeMenu />
          <StyledExternalLink id={`charts-nav-link`} href="https://info.diffusion.fi">
            {t('Charts')}
            <sup>↗</sup>
          </StyledExternalLink>
        </HeaderLinks>
      </HideSmall>
      <HeaderControls>
        <HeaderElement>
          <HideSmall>
            {chainId && NETWORK_LABELS[chainId] && (
              <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
            )}
          </HideSmall>
          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            {account && userEthBalance ? (
              <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                {userEthBalance?.toSignificant(4)} <span style={{ color: '#27D2EA' }}>EVMOS</span>
              </BalanceText>
            ) : null}
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <HeaderElementWrap>
          <HideLarge>
            <MobileMenu />
          </HideLarge>
        </HeaderElementWrap>
        <HeaderElementWrap>
          <Menu />
        </HeaderElementWrap>
      </HeaderControls>
    </HeaderFrame>
    <section className={collapsemenu ? "sidebar mobile-sidebar" : "sidebar collapse"}>
    <div className="top">
        <img src={TycheLogo} alt="logo" /> <span className='text-gradient'>TYCHE</span>
        <button className="mobile-menu-close-icon" onClick={() => { setCollapseMenu(!collapsemenu) }}>
            <img src="/images/close.svg" alt="menu" />
        </button>
    </div>
    <div className="menu-items">
        <div className={splitLocation[1] === "" ? "active-menu menu" : "menu"}>
            <NavLink to='/' className='nav-item'>
                <div className='nav-link'>
                    <img src="/images/menu-1.svg" alt="menu-1" />
                </div>
                <span>swap</span>
            </NavLink>
        </div>
        <div className={splitLocation[1] === "mint" ? "active-menu menu" : "menu"}>
            <NavLink to='/mint' className="nav-item">
                <div className='nav-link'>
                    <img src="/images/menu-2.svg" alt="menu-2" />
                </div>
                <span>mint</span>
            </NavLink>
        </div>
        <div className={splitLocation[1] === "my-liquidity" ? "active-menu menu" : "menu"}>
            <NavLink to='/my-liquidity' className="nav-item">
                <div className='nav-link'>
                    <img src="/images/menu-3.svg" alt="menu-3" />
                </div>
                <span>pool</span>
            </NavLink>
        </div>
        <div className={splitLocation[1] === "assets" ? "active-menu menu" : "menu"}>
            <NavLink to='/assets' className="nav-item">
                <div className='nav-link'>
                    <img src="/images/menu-4.svg" alt="menu-4" />
                </div>
                <span>assets</span>
            </NavLink>
        </div>
        <div className={splitLocation[1] === "stack" ? "active-menu menu" : "menu"}>
            <NavLink to='/stack' className="nav-item">
                <div className='nav-link'>
                    <img src="/images/menu-5.svg" alt="menu-5" />
                </div>
                <span>stack <img src="/images/square-arrow-up.svg" alt="square-arrow-up" /></span>
            </NavLink>
        </div>
        <div className={splitLocation[1] === "governance" ? "active-menu menu" : "menu"}>
            <NavLink to='/governance' className="nav-item">
                <div className='nav-link'>
                    <img src="/images/menu-6.svg" alt="menu-6" />
                </div>
                <span>governance <img src="/images/square-arrow-up.svg" alt="square-arrow-up" /></span>
            </NavLink>
        </div>
        <div className={splitLocation[1] === "lending" ? "active-menu menu" : "menu"}>
            <NavLink to='/lending' className="nav-item">
                <div className='nav-link'>
                    <img src="/images/menu-7.svg" alt="menu-7" />
                </div>
                <span>lending <img src="/images/square-arrow-up.svg" alt="square-arrow-up" /></span>
            </NavLink>
        </div>
    </div>
    <div className="menu-icon">
        <button className='collapse-menu-btn' onClick={() => {setCollapseMenu(!collapsemenu)}}>
            <img src="/images/menu-icon.svg" alt="menu-icon" />
        </button>
        <button className='gradient-btn'>
            <img src="/images/wallet.svg" alt="wallet" />
            <span>connect wallet</span>
        </button>
        <div className="social-icons">
            <a href='/' target="blank">
                <img src="/images/discord.svg" alt="discord" />
            </a>
            <a href='/' target="blank">
                <img src="/images/telegram.svg" alt="telegram" />
            </a>
            <a href='/' target="blank">
                <img src="/images/twitter.svg" alt="twitter" />
            </a>
            <a href='/' target="blank">
                <img src="/images/medium.svg" alt="medium" />
            </a>
        </div>
    </div>
    <button className="mobile-menu-icon" onClick={() => { setCollapseMenu(!collapsemenu) }}>
        <img src="/images/menu-icon.svg" alt="menu" />
    </button>
</section>
</>
  )
}
