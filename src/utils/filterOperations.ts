const filterOperations = (data: any) => {
  const operations =
    data?.me?.operations.filter((operation: any) => operation.account.name === 'Personal') || [];
  return operations;
};

export default filterOperations;
