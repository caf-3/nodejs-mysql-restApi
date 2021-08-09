const deployment = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "testRestApi"
}
const production = {
    HOST: "localhost",
    USER: "<DB_USER />",
    PASSWORD: "<USER_PASSWORD/>",
    DB: "<DB_NAME/>",
    PORT: "<DB_PORT/>"
}
if(process.env.NODE_ENV == 'production'){
    module.exports = production
}else{
    module.exports = deployment
}