const Pool = require('pg').Pool;
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '0bilisam0',
    database:'blackList',
    
  });

pool.connect();

  const getUsers = (request, response) => {

    pool.query('SELECT * FROM  public."blackList_Table"', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM public."blackList_Table" WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const createUser = (request, response) => {
   const {nombreBlacklist ,id,status,duración,descripcion}= request.body;

   pool.connect(); 
    pool.query('INSERT INTO public."blackList_Table" ("nombreBlacklist" ,"id","status","duración","descripcion") VALUES ($1, $2,$3,$4,$5)',
     [nombreBlacklist ,id,status,duración,descripcion], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows}`)
    })
  }
  pool.connect();
  const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { nombreBlacklist ,status,duración,descripcion} = request.body;
   
  
    pool.query(
      'UPDATE public."blackList_Table" SET "nombreBlacklist"=$1 ,"status"=$3,"duración"=$4,"descripcion"=$5 WHERE id = $2',
      [nombreBlacklist ,id,status,duración,descripcion],
      (error, results) => {
        if (error) {
         console.error(error.message);
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM blackList_Table WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }