const config = {
    //mongodb connection settings
    database: {
        login:   'YOUR_LOGIN',
        password:   'YOUR_PASSWORD',
        url: '@dsXXXXXX.mlab.com:XXXXX',
        dbname: 'DB_NAME'
    },
    mailer: {
    auth: {
      user: 'USER',
      pass: 'PASSWORD',
      },
      defaultFromAddress: 'YOUR_EMAIL'
    },
    jwt: {
      secret: 'SECRET'
    }
}
module.exports = config;