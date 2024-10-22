const express = require("express");
const cors = require("cors"); // Importar o pacote cors
const app = express();
const port = 8080;

// Usar o middleware CORS para permitir requisições de origens diferentes
app.use(cors());

app.use(express.json());

app.use("/api/categoriaproduto", require("./routes/categoriaProdutoRoutes"));
app.use("/api/endereco", require("./routes/enderecoRoutes"));
app.use("/api/cliente", require("./routes/clienteRoutes"));
app.use("/api/contato", require("./routes/contatoRoutes"));
app.use("/api/tipousuario", require("./routes/tipousuarioRoutes"));
app.use("/api/usuario", require("./routes/usuarioRoutes"));
app.use("/api/fornecedor", require("./routes/fornecedorRoutes"));
app.use("/api/contas", require("./routes/contasRoutes"));
app.use("/api/produto", require("./routes/produtoRoutes"));
app.use("/api/estoque", require("./routes/estoqueRoutes"));
app.use("/api/venda", require("./routes/vendaRoutes"));
app.use("/api/itemvenda", require("./routes/itemvendaRoutes"));
app.use("/api/relatorios", require("./routes/relatorioRoutes"));
app.use("/api/representante", require("./routes/representanteRoutes"));
app.use("/api/relatorio", require("./routes/geradorRelatorioRoutes"));
app.use("/api/receber", require("./routes/receberRoutes"));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
