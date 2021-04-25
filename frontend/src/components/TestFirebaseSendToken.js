const TestFirebaseSendToken = ({ firebase }) => {
    let a = localStorage.getItem("idtoken");
    console.log("Firebase token: " + a);
    return a ? (
        <h1 style={{ marginTop: "100px" }}>
            Token is available! <br />
            {a}
        </h1>
    ) : (
        <h1 style={{ marginTop: "100px" }}>No token found!</h1>
    );
};

export default TestFirebaseSendToken;
