import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_PGnyCb9EG",
    ClientId: "ksa6jprc4dgomifdo1p5ktkq2"
}

export default new CognitoUserPool(poolData);