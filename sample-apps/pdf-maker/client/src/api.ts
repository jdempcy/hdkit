// The data object should contain:
// name: string, birthdate: Date, birthtime: string, location: string
export async function generatePDFReport(data:object): Promise<Response> {

  console.log('api generatePDFreport')

  let fetchData:object = {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  return await fetch('http://localhost:3001/api/generate-pdf-report/', fetchData);
}
