import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'


export default function Sidebar() {
	
	const [collapsemenu, setCollapseMenu] = useState(false);
	const location = useLocation();
	const { pathname } = location;
	const splitLocation = pathname.split("/");
	
	return (
		<div className='sidebar-menus'>
			<section className={collapsemenu ? "sidebar mobile-sidebar" : "sidebar collapse"}>
				<div className="top">
					<img src="/images/logo.svg" alt="logo" /> <span className='text-gradient'>TYCHE</span>
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
					<button className='collapse-menu-btn' onClick={() => { setCollapseMenu(!collapsemenu) }}>
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
		</div>
	)
}
