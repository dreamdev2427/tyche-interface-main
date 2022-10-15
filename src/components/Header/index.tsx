import useScrollPosition from '@react-hook/window-scroll'
import React from 'react'
import { useState } from 'react'
import { Text } from 'rebass'
import { NavLink , useLocation} from 'react-router-dom'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'

import { useActiveWeb3React } from '../../hooks/web3'
import { useETHBalances } from '../../state/wallet/hooks'
import { BridgeMenu } from '../Menu/BridgeMenu'

import { YellowCard } from '../Card'

import Web3Status from '../Web3Status'
// import Modal from '../Modal'
// import UniBalanceContent from './UniBalanceContent'
import { ChainId } from 'constants/chains'
import TycheLogo from '../../assets/svg/logo.svg'

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
const MenuIconWrapper = styled.div`
.gradient-btn{
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: none;
  padding: 10px 27px;
  cursor: pointer;
  background: linear-gradient(92.13deg, #944DFF 0.33%, #00CBA1 100.07%);
    border-radius: 16px;
  span{
      margin-left: 5px;
      text-transform: uppercase;
      font-weight: bold;
  }
}
.social-icons{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}`

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
    <section className={collapsemenu ? "sidebar mobile-sidebar" : "sidebar"}>
    <div className="top">
        <img src={TycheLogo} alt="logo" /> <span className='text-gradient'>TYCHE</span>
        <button className="mobile-menu-close-icon" onClick={() => { setCollapseMenu(!collapsemenu) }}>
            <img src="/images/close.svg" alt="menu" />
        </button>
    </div>
    <div className="menu-items">
        <div className={splitLocation[1] === "" || splitLocation[1] === "swap" ? "active-menu menu" : "menu"}>
            <NavLink to='/swap' className='nav-item'>
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
        <div className={splitLocation[1] === "pool" ? "active-menu menu" : "menu"}>
            <NavLink to='/pool' className="nav-item"  isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/add') ||
              pathname.startsWith('/remove') ||
              pathname.startsWith('/increase') ||
              pathname.startsWith('/find')
            }>
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
        <div className={splitLocation[1] === "stake" ? "active-menu menu" : "menu"}>
            <NavLink to='/stake' className="nav-item">
                <div className='nav-link'>
                    <img src="/images/menu-5.svg" alt="menu-5" />
                </div>
                <span>stake <img src="/images/square-arrow-up.svg" alt="square-arrow-up" /></span>
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
    <MenuIconWrapper>                
        {/* {chainId && NETWORK_LABELS[chainId] && (
              <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
            )} */}
          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            {/* {account && userEthBalance ? (
              <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                {userEthBalance?.toSignificant(4)} <span style={{ color: '#27D2EA' }}>EVMOS</span>
              </BalanceText>
            ) : null} */}
            <Web3Status />
          </AccountElement>
        {/* <button className='gradient-btn'>
            <img src="/images/wallet.svg" alt="wallet" />
            <span>connect wallet</span>
        </button> */}
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
    </MenuIconWrapper>
    <button className="mobile-menu-icon" 
      style={{
        display: "none",
        background: "transparent",
        position: "fixed",
        right: "10px",
        top: "20px",
        border: "none",
        cursor: "pointer"
      }}
      onClick={() => { setCollapseMenu(!collapsemenu) }}>
        <img src="/images/menu-icon.svg" alt="menu" />
    </button>
</section>
  )
}
