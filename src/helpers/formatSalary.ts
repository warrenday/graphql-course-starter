const formatSalary = (salary: number) => {
  return salary.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
};

export default formatSalary;
