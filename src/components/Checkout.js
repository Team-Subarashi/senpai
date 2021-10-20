import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userState } from "../atoms";
import { useRecoilValue } from "recoil";

const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <form action="/#/create-checkout-session/temp" method="POST">
      <button type="submit">Checkout</button>
    </form>
  </section>
);

export default function Checkout({
  match,
  // location
}) {
  const [message, setMessage] = useState("");
  const user = useRecoilValue(userState);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    let trueMess = window.location.href.split("?")[1];

    if (trueMess === "success=true") {
      setMessage("Lesson booked!");
      axios({
        method: "patch",
        url: `/lessons/${match.params.lessonId}`,
        data: {
          kouhaiId: user._id,
        },
      });
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [user]);

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
      <Link to={`/senpai/${match.params.senpaiId}/schedule`}>
        Return to Senpai schedule
      </Link>
    </section>
  );

  return message ? (
    <div>
      <img
        src="https://i.imgur.com/MTH8PlV.png"
        style={{ marginTop: "5vh", marginBottom: "5vh", borderRadius: "4px" }}
      />
      <Message message={message} />
    </div>
  ) : (
    <ProductDisplay />
  );
}
