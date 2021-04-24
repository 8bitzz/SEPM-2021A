const configDev = {
    apiKey: "AIzaSyDD4zLJUpQ7RvXS1giuLXbE791jzjeDgLU",
    authDomain: "edusearch-680ef.firebaseapp.com",
    databaseURL: "https://edusearch-680ef-default-rtdb.firebaseio.com",
    projectId: "edusearch-680ef",
    storageBucket: "edusearch-680ef.appspot.com",
    messagingSenderId: "392155943776",
}

const configProduction = {
    apiKey: "AIzaSyDD4zLJUpQ7RvXS1giuLXbE791jzjeDgLU",
    authDomain: "edusearch-680ef.firebaseapp.com",
    databaseURL: "https://edusearch-680ef-default-rtdb.firebaseio.com",
    projectId: "edusearch-680ef",
    storageBucket: "edusearch-680ef.appspot.com",
    messagingSenderId: "392155943776",
}

export default process.env.NODE_ENV === "production" ? configProduction : configDev;