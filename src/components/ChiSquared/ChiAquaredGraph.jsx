import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ChiSquaredGraph = ({ observed, expected }) => {
  if (typeof observed !== 'string' || typeof expected !== 'string') {
    return <p>Error: Observed and expected Observeds must be strings.</p>;
  }

  const observedArray = observed.split(/[\n,]+/).map(parseFloat);
  const expectedArray = expected.split(/[\n,]+/).map(parseFloat);

  if (observedArray.length !== expectedArray.length) {
    return <p>Error: Observed and expected arrays must have the same length.</p>;
  }

  const data = observedArray.map((Observed, index) => {
    return { name: `Category ${index+1}`, Observed, expected: expectedArray[index] };
  });

  return (
      <div className='setting chart-con'>
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Observed" fill="#8884d8" />
      <Bar dataKey="expected" fill="#82ca9d" />
    </BarChart>
    </div>
  );
};

export default ChiSquaredGraph;
