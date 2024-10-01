import { FormEvent, useState } from "react";
import axios from "axios";

const Newsletter = () => {
  const [showTerms, setShowTerms] = useState(false);

  const termsButton = () => {
      setShowTerms(!showTerms);
  };

  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<
    "success" | "error" | "loading" | "idle"
  >("idle");
  const [responseMsg, setResponseMsg] = useState<string>("");
  const [statusCode, setStatusCode] = useState<number>();

  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await axios.post("/api/subscribe", { email });

      setStatus("success");
      setStatusCode(response.status);
      setEmail("");
      setResponseMsg(response.data.message);
    } catch (err) {
      
      if (axios.isAxiosError(err)) {
        setStatus("error");
        setStatusCode(err.response?.status);
        setResponseMsg(err.response?.data.error);
      }
    }
  }

  return (
    <>
      <form
        className="newsletter-block"
        onSubmit={handleSubscribe}
      >
        <div className="newsletter-block-form">
          <input
            //className={`grow mr-1 transition ease-out delay-75 focus-within:border-2 focus-within:border-purple-600 items-center h-14 pr-0.5 rounded caret-purple-700 outline-none px-4 disabled:border-slate-400 border ${statusCode == 400 ? "border-orange-500" : "border-purple-600"} `}
            className={`newsletter-input ${statusCode == 400 ? "border-orange-500" : "border-purple-600"}`}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status == "loading"}
          />
          <button className="newsletter-button" type="submit" disabled={status == "loading"}>Sign Up</button>
        </div>
          {status === "success" ? (
            <div className="server-message">
              <p className="">{responseMsg}</p>
            </div>
          ) : null}
          {status === "error" ? (
            <div className="server-message">
              <p className="error">{responseMsg}</p>
            </div>
          ) : null}
      </form>
      <div className="newsletter-terms-block">
          {showTerms ? (<p className="newsletter-terms-button" onClick={termsButton}>Hide</p>) : (<p className="newsletter-terms-button" onClick={termsButton}>Terms</p>)}
          {showTerms && 
              <p className="newsletter-prevent-text">By submitting your information, you agree to receive updates and marketing messages about blurblur. You understand that you can opt-out at any time by emailing <span><a className="newsletter-prevent-email" href="mailto:privacy@blurblurmusic.com">privacy@blurblurmusic.com</a></span>.</p>
          }
      </div>
      
    </>
  );
};

export default Newsletter;