import React from 'react'
import { WalletNav } from '../components/Navbar'
import "../styles/wallet.css";
import { useSelector } from 'react-redux';

function Arrow(props){
    const {type} = props
    return(
        <>
        {type == "in" && <div className="green arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.3846 22L21.3846 18.7692L7.50846 18.7692L23 3.27769L20.7223 1L5.23077 16.4915L5.23077 2.61538L2 2.61538L2 22L21.3846 22Z" fill="#00D755"/>
</svg>
        </div> }

{type =="out" && <div className="red arrow"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.61538 2V5.23077H16.4915L1 20.7223L3.27769 23L18.7692 7.50846V21.3846H22V2H2.61538Z" fill="#F8333D"/>
</svg></div> }
        </>
    )

}

function CashFlow(props){
    const {type} = props 
    return(
        <div className="cashflow">
            <Arrow type={type} />
            <div className="text">
                <p>N20,000</p>
                <p className='sm'>Deposited at 10:00AM, 05/09/23</p>
            </div>
        </div>
    )
}

export default function Wallet() {
    const balance = useSelector(state => state.auth.profile.money_balance)

  return (
    <div className="wallet">
        <WalletNav />

        
        <div className="wallet-body">
            <div className="amount">N {balance.toLocaleString()}</div>

            <div className="buttons">
                <button className='gray'>Withdraw</button>
                <button className='green'>Deposit</button>
            </div>
            <div className="activity">
                <h1>Recent Activity</h1>
                <CashFlow type="out"/>
                <CashFlow type="in"/>
                <CashFlow type="in"/>
                
            </div>
        </div>
    </div>
  )
}
