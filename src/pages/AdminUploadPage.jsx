import Header from "../components/header/Header";

function AdminUploadPage() {
  return (
    <>
      <Header />

      <main className="container" style={{ paddingTop: "2rem" }}>
        <h1>Upload de imagens</h1>
        <p>Aqui vamos montar o envio de imagens dos produtos.</p>
      </main>
    </>
  );
}

export default AdminUploadPage;