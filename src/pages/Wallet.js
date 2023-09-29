import React from "react";
import { WalletNav } from "../components/Navbar";
import "../styles/wallet.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Arrow(props) {
  const { type } = props;
  return (
    <>
      {type == "in" && (
        <div className="green arrow">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.3846 22L21.3846 18.7692L7.50846 18.7692L23 3.27769L20.7223 1L5.23077 16.4915L5.23077 2.61538L2 2.61538L2 22L21.3846 22Z"
              fill="#00D755"
            />
          </svg>
        </div>
      )}

      {type == "out" && (
        <div className="red arrow">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.61538 2V5.23077H16.4915L1 20.7223L3.27769 23L18.7692 7.50846V21.3846H22V2H2.61538Z"
              fill="#F8333D"
            />
          </svg>
        </div>
      )}
    </>
  );
}

function CashFlow(props) {
  const { type } = props;
  return (
    <div className="cashflow">
      <Arrow type={type} />
      <div className="text">
        <p>N20,000</p>
        <p className="sm">Deposited at 10:00AM, 05/09/23</p>
      </div>
    </div>
  );
}

export default function Wallet() {
  const balance = useSelector((state) => state.auth.profile.money_balance);

  return (
    <div className="wallet">
      <WalletNav />

      <div className="wallet-body">
        <div className="amount">N {balance.toLocaleString()}</div>

        <div className="buttons">
          <button
            className="gray"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#verificationModal"
          >
            Withdraw
          </button>

          <div
            class="modal fade"
            id="verificationModal"
            tabindex="-1"
            aria-labelledby="verificationModal"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="verificationModalLabel">
                    Verify Your Identity
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <p>
                    In line with regulatory guidelines all players on the
                    platform must have a valid means of identifiication. Since
                    this is your first withdrawal , we will need to verify your
                    identity . Kindly upload your NIN or Passport to verify your
                    identity.
                    {/* to provide a Versuz Virtual Wallet.
                     */}
                  </p>

                  <svg
                    width="249"
                    height="248"
                    viewBox="0 0 249 248"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      width="248"
                      height="248"
                      rx="46.5"
                      fill="#F4EBFF"
                    />
                    <path
                      d="M194.25 178.25V69.75C194.25 61.225 187.275 54.25 178.75 54.25H70.25C61.725 54.25 54.75 61.225 54.75 69.75V178.25C54.75 186.775 61.725 193.75 70.25 193.75H178.75C187.275 193.75 194.25 186.775 194.25 178.25ZM97.375 135.625L116.75 158.952L143.875 124L178.75 170.5H70.25L97.375 135.625Z"
                      fill="#6941C6"
                    />
                  </svg>

                  <div className="buttons">
                    <button>Verify </button>
                    <button className="white" data-bs-dismiss="modal">
                      Cancel{" "}
                    </button>
                  </div>
                </div>
                {/* <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          <button
            className="green"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#depositModal"
          >
            Deposit
          </button>
          <div
            class="modal fade"
            id="depositModal"
            tabindex="-1"
            aria-labelledby="depositModal"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="depositModalLabel">
                    Fund Your Versuz Wallet
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <p style={{ fontWeight: "bold" }}>
                    How much do you want to deposit?
                  </p>
                <div className="input-cont">
                ₦
                  <input type="number" min="1000" className="form-control " placeholder="1000"/>
                </div>

                  <div className="buttons">
                    <Link to="/deposit" data-bs-dismiss="modal">
                    <button >Deposit </button>
                    </Link>
                    <button className="white" data-bs-dismiss="modal">
                      Cancel{" "}
                    </button>
                  </div>
                </div>
                {/* <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Save changes
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="activity">
          <h1>Recent Activity</h1>
          <CashFlow type="out" />
          <CashFlow type="in" />
          <CashFlow type="in" />
        </div>
      </div>
    </div>
  );
}
