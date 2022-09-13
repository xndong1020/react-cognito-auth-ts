import React, { Fragment } from "react";

export default function Products() {
  return (
    <Fragment>
      <section className="section">
        <div className="container">
          <h1>Energy Products</h1>
          <p className="subtitle is-5">
            Invest in a clean future with our efficient and cost-effective green
            energy products:
          </p>
          <br />
          <div className="columns">
            <div className="column">
              <div className="tile is-ancestor">
                <div className="tile is-4 is-parent  is-vertical">
                  This is the Production Page.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
