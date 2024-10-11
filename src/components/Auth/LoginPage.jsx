import {
  Card,
  Input,
  IconButton,
  Button,
  Typography,
} from "@material-tailwind/react";
import { SignUpType } from "./SignUpType";
import PeaceOfMindLogo from "../../assets/Logo/PeaceOfMind_logo_small.png";
import { useState } from "react";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { getUserByFirebaseUID } from "../../axios/index.axios";
import { SignUpTypeForGoogle } from "./SignUpTypeForGoogle";
import { DemoLogins } from "./DemoLogins";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { setGuardianLoggedIn, setCarerLoggedIn, setCurrentUser } = useAuth();
  const [openPromptGoogle, setOpenPromptGoogle] = useState(false);

  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithEmailAndPassword(email, password)
        .then(({ user }) => {
          getUserByFirebaseUID(user.uid).then((populatedUser) => {
            setCurrentUser(populatedUser);
            if (populatedUser.user.role === "guardian") {
              setGuardianLoggedIn(true);
              setCarerLoggedIn(false);
            }
            if (populatedUser.user.role === "carer") {
              setGuardianLoggedIn(false);
              setCarerLoggedIn(true);
            }
            setIsSigningIn(false);
            navigate(`/dashboard`);
          });
        })
        .catch((error) => {
          console.error("Error signing in:", error);
          if (error.code === "auth/wrong-password") {
            alert("Incorrect password. Please try again.");
          } else if (error.code === "auth/user-not-found") {
            alert("User not found. Please sign up first.");
          } else if (error.code === "auth/invalid-email") {
            alert("Invalid email format. Please try again.");
          }
        });
    }
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen ">
      <SignUpTypeForGoogle
        openPromptGoogle={openPromptGoogle}
        setOpenPromptGoogle={setOpenPromptGoogle}
      />
      <DemoLogins />
      <Card shadow={false} className="bg-blue-100 p-5 max-w-[95%]">
        <div className="flex flex-row justify-between">
          <Typography variant="h4" color="black">
            Welcome Back
          </Typography>
          <img className="h-12" src={PeaceOfMindLogo} alt="Logo" />
        </div>
        <form onSubmit={onSubmit} className="mt-8 mb-2 w-80 max-w-full sm:w-96">
          <Typography variant="h4" className="my-4" color="black">
            Sign In
          </Typography>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@mail.com"
              className="bg-white !text-[16px] !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              autoComplete="current-password"
              size="lg"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="bg-white !text-[16px] !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button
            type="submit"
            disabled={isSigningIn}
            className="mt-8"
            fullWidth
          >
            {isSigningIn ? "Signing In..." : "Sign In"}
          </Button>
          <div className="flex flex-row justify-center items-center gap-5 my-6">
            <IconButton
              disabled={isSigningIn}
              onClick={() => {
                setOpenPromptGoogle(true);
              }}
              className="rounded bg-[#ea4335] hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <title>google [#178]</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    id="Dribbble-Light-Preview"
                    transform="translate(-300.000000, -7399.000000)"
                    fill="white"
                  >
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                        d="M263.821537,7247.00386 L254.211298,7247.00386 C254.211298,7248.0033 254.211298,7250.00218 254.205172,7251.00161 L259.774046,7251.00161 C259.560644,7252.00105 258.804036,7253.40026 257.734984,7254.10487 C257.733963,7254.10387 257.732942,7254.11086 257.7309,7254.10986 C256.309581,7255.04834 254.43389,7255.26122 253.041161,7254.98137 C250.85813,7254.54762 249.130492,7252.96451 248.429023,7250.95364 C248.433107,7250.95064 248.43617,7250.92266 248.439233,7250.92066 C248.000176,7249.67336 248.000176,7248.0033 248.439233,7247.00386 L248.438212,7247.00386 C249.003881,7245.1669 250.783592,7243.49084 252.969687,7243.0321 C254.727956,7242.65931 256.71188,7243.06308 258.170978,7244.42831 C258.36498,7244.23842 260.856372,7241.80579 261.043226,7241.6079 C256.0584,7237.09344 248.076756,7238.68155 245.090149,7244.51127 L245.089128,7244.51127 C245.089128,7244.51127 245.090149,7244.51127 245.084023,7244.52226 L245.084023,7244.52226 C243.606545,7247.38565 243.667809,7250.75975 245.094233,7253.48622 C245.090149,7253.48921 245.087086,7253.49121 245.084023,7253.49421 C246.376687,7256.0028 248.729215,7257.92672 251.563684,7258.6593 C254.574796,7259.44886 258.406843,7258.90916 260.973794,7256.58747 C260.974815,7256.58847 260.975836,7256.58947 260.976857,7256.59047 C263.15172,7254.63157 264.505648,7251.29445 263.821537,7247.00386"
                        id="google-[#178]"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </IconButton>
            <IconButton
              disabled={isSigningIn}
              className="rounded bg-[#1877F2] hover:shadow-[#1DA1F2]/20 focus:shadow-[#1DA1F2]/20 active:shadow-[#1DA1F2]/10"
            >
              <svg
                fill="white"
                className="h-5 w-5"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 310 310"
                xml:space="preserve"
              >
                <g id="XMLID_834_">
                  <path
                    id="XMLID_835_"
                    d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064
		c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996
		V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545
		C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703
		c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z"
                  />
                </g>
              </svg>
            </IconButton>
            <IconButton
              disabled={isSigningIn}
              className="rounded bg-[#333333] hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10"
            >
              <svg
                viewBox="-1.5 0 20 20"
                version="1.1"
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <title>apple [#173]</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    id="Dribbble-Light-Preview"
                    transform="translate(-102.000000, -7439.000000)"
                    fill="white"
                  >
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                        d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485"
                        id="apple-[#173]"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </IconButton>
          </div>
          <div className="flex flex-row justify-center gap-2 mt-4 ">
            <Typography color="gray" className="text-center font-normal">
              Don't have an account?
            </Typography>
            <SignUpType />
          </div>
        </form>
      </Card>
    </div>
  );
}
