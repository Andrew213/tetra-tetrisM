import { User } from 'models/user'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

export const createClientAndConnect = async (): Promise<Sequelize | null> => {
  try {
    const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
      process.env

    const host = process.env.POSTGRES_HOST || 'localhost'
    const sequelizeOptions: SequelizeOptions = {
      username: POSTGRES_USER,
      host: host,
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT),
      dialect: 'postgres',
    }
    const sequelize = new Sequelize(sequelizeOptions)

    const res = await sequelize.query('SELECT NOW()')
    console.log('  ➜ 🎸 Connected to the database at:', res)
    sequelize.addModels([User])
    return sequelize
  } catch (e) {
    console.error(e)
  }

  return null
}
