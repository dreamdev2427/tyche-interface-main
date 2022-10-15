import styled from 'styled-components/macro'

export const StandardPageWrapper = styled.div`
  padding-top: 160px;
  width: 100%;
`

export const SidebarWrapper = styled.div`
  padding: 0 20px;
  overflow-x: hidden;
  background: rgba(14, 14, 14, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // align-items: center;
  position: fixed;
  height: 100%;
  width: 240px;
  left: 0;
  top: 0;
  z-index: 9999;
  transition: 0.4s ease-in-out;
  .top{
      padding: 20px 0;
      display: flex;
      align-items: center;
      span{
          font-family: 'Syncopate', sans-serif;
          font-weight: bold;
          margin-left: 10px;
      }
  }
  .menu-icon{
      padding: 20px 0;
      .collapse-menu-btn{
          background: transparent;
          border: none;
          cursor: pointer;
      }
  }
  .menu-items{
      display: flex;
      flex-direction: column;
      .nav-item{
          display: flex;
          border: none;
          background: transparent;
          align-items: center;
          cursor: pointer;
          text-decoration: none;
          span{
              margin-left: 15px;
              text-transform: uppercase;
              color: $text;
              font-weight: 700;
              font-size: 15px;
              line-height: 19px;
              img{
                  margin-left: 15px;
              }
          }
      }
      .nav-link{
          // padding: 10px 20px;
          display: block;
          background: #242628;
          // width: 45px;
          // height: 45px;
          // line-height: 55px;
          padding: 10px;
          text-align: center;
          margin: 10px 0;
          border-radius: 50%;
          img{
              max-width: 20px;
          }
      }
      .active-menu{
          .active{
              .nav-link{
                  position: relative;
                  &::before{
                      content: '';
                      position: absolute;
                      width: 40px;
                      height: 40px;
                      left: 0px;
                      top: 12px;
                      background: linear-gradient(92.13deg, #944DFF 0.33%, #00CBA1 100.07%);
                      filter: blur(12px);
                      z-index: -1;
                  }
              }
              span{
                  color: white;
              }
          }
      }
  }
  .menu-icon{
      .gradient-btn{
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          border: none;
          padding: 10px 27px;
          cursor: pointer;
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
      }
  }
`

export const SidebarCollapseWrapper = styled.div`
.sidebar.collapse{
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .menu-items, .top{
      span{
          display: none;
      }
  }
  .gradient-btn,.social-icons{
      display: none;
  }
  .collapse-menu-btn{
      display: block;
  }
  &:hover{
      width: 220px;
      // align-items: flex-start;
      .menu-items, .top{
          span{
              display: block;
          }
      }
      .gradient-btn, .social-icons{
          display: flex;
      }
      .collapse-menu-btn{
          display: none;
      }
  }
}`
