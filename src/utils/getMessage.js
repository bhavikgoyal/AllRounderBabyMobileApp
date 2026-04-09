const getMessage = (resp) => {
    return (
        resp?.data?.message ||
        resp?.data?.Message ||
        resp?.result?.message ||
        resp?.message ||
        resp?.error ||
        'Something went wrong'
    );
};

export default getMessage;
