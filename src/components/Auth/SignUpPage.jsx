import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useParams, Link } from "react-router-dom";
import PeaceOfMindLogo from "../../assets/Logo/PeaceOfMind_logo_small.png";
import { useState } from "react";
import { doSignInWithGoogle } from "../../firebase/auth";
import { ErrorTab } from "../General/ErrorTab";
import { addNewUser } from "../../axios/index.axios";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { getUserByFirebaseUID } from "../../axios/index.axios";

export function SignUpPage() {
  const { role } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAcceptingTerms, setIsAcceptingTerms] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { setGuardianLoggedIn, setCarerLoggedIn, setCurrentUser } = useAuth();

  /*

   Current considerations: As the code is now the user can sign up and this creates a firebase user and following this the user will be added to the database.
   - This can lead to a few potential issues: if the backend for some reason was down and a user tries to sign up then they will create a firebase user but not add them to the database.
   - To avoid this, I can either move the firebase user creation to the backend or use firebase's cloud functions to handle the database operations of adding a new user.

  */

  function onSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    if (!email || !password || !name || !confirmPassword || !isAcceptingTerms) {
      setErrorMessage("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (!isRegistering) {
      setIsRegistering(true);
      doCreateUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const firebaseUser = userCredential.user;

          return addNewUser(firebaseUser.uid, name, email, role);
        })
        .then(({ user }) => {
          return getUserByFirebaseUID(user.firebaseUID);
        })
        .then((populatedUser) => {
          setCurrentUser(populatedUser);
          if (populatedUser.user.role === "guardian") {
            setGuardianLoggedIn(true);
            setCarerLoggedIn(false);
          }
          if (populatedUser.user.role === "carer") {
            setGuardianLoggedIn(false);
            setCarerLoggedIn(true);
          }
          setIsRegistering(false);
          navigate(`/dashboard`);
        })
        .catch((error) => {
          console.log(typeof error.message);
          if (error.message.includes("invalid-email")) {
            setErrorMessage("Invalid email format");
          } else if (error.message.includes("weak-password")) {
            setErrorMessage("Password is too weak");
          } else if (error.message.includes("email-already-in-use")) {
            setErrorMessage("Email already in use");
          } else {
            console.error("Unknown error during sign-up process:", error);
            setErrorMessage("An error occurred");
          }
          setIsRegistering(false);
        });
    }
  }

  function onGoogleSignUp(event) {
    event.preventDefault;
    if (!isRegistering) {
      setIsRegistering(true);
      doSignInWithGoogle()
        .then((result) => {
          const user = result.user;
          console.log(result._tokenResponse.isNewUser);
          if (result._tokenResponse.isNewUser) {
            return addNewUser(
              user.uid,
              user.displayName,
              user.email,
              role,
              user.photoURL
            ).then(({ user }) => {
              return user.firebaseUID;
            });
          } else {
            console.log("existing user signed in");
            return user.uid;
          }
        })
        .then((firebaseUID) => {
          return getUserByFirebaseUID(firebaseUID);
        })
        .then((populatedUser) => {
          setCurrentUser(populatedUser);
          if (populatedUser.user.role === "guardian") {
            setGuardianLoggedIn(true);
            setCarerLoggedIn(false);
          }
          if (populatedUser.user.role === "carer") {
            setGuardianLoggedIn(false);
            setCarerLoggedIn(true);
          }
          setIsRegistering(false);
          navigate(`/dashboard`);
        });
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card
        shadow={false}
        className="bg-blue-100 p-5 max-w-[95%] max-h-[90%] overflow-scroll"
      >
        <div className="flex flex-row gap-4 justify-between">
          <div className="flex flex-col gap-1">
            <Typography variant="h5" color="black">
              Sign Up as a {role[0].toUpperCase() + role.slice(1)}
            </Typography>

            <Typography color="black" className="mt-1 font-normal">
              Enter your details to register.
            </Typography>
          </div>
          <img className="h-12" src={PeaceOfMindLogo} alt="Logo" />
        </div>

        <form
          className="mt-6 mb-2 w-70 max-w-screen-lg sm:w-96"
          onSubmit={onSubmit}
        >
          <div className="mb-1 flex flex-col gap-5">
            <Typography variant="h6" color="black" className="-mb-3">
              Your Name
            </Typography>
            <Input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              size="md sm:lg"
              placeholder="Full Name"
              className="bg-white !text-[16px] !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              size="md sm:lg"
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
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              size="md sm:lg"
              placeholder="********"
              className="bg-white !text-[16px] !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Confirm Password
            </Typography>
            <Input
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
              size="md sm:lg"
              placeholder="********"
              className="bg-white !text-[16px] !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Checkbox
            className="bg-white"
            onChange={(event) => setIsAcceptingTerms(event.target.checked)}
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal text-[11px]"
              >
                I agree the
                <a
                  href="#"
                  className=" font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          {errorMessage && <ErrorTab errorMessage={errorMessage} />}
          <Button
            className="mt-6"
            fullWidth
            disabled={!isAcceptingTerms}
            type="submit"
          >
            {isRegistering ? "Signing Up..." : "Sign Up"}
          </Button>
          <div className="flex flex-row justify-center items-center gap-5 my-6">
            <IconButton
              disabled={isRegistering}
              onClick={(e) => {
                onGoogleSignUp(e);
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
              disabled={isRegistering}
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
              disabled={isRegistering}
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
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link className="cursor-pointer font-bold" to="/login">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
