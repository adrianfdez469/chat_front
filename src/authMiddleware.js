const AuthMiddleware = async (nextOptimisticAction) => {
    // Revisar si el token esta en timepo
    const token = localStorage.getItem('token');
    const token_expires = localStorage.getItem('token_expires');

    if (token && token_expires && new Date(token_expires).getTime() > new Date().getTime()) {
      const dataOptimistic = await nextOptimisticAction(token);
      return dataOptimistic;
    } 
  }

  
  export default AuthMiddleware;