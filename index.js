require('dotenv').config();
const express = require('express');
const oasGenerator = require('express-oas-generator');
const cors = require("cors");
const app = express();

// Inicializa o OAS Generator para documentação automática
oasGenerator.init(app, {});

// Configura o CORS para permitir apenas o domínio da Vercel
const corsOptions = {
  origin: ['https://erp-adegas.vercel.app'], // Substitua pela URL do seu front-end na Vercel
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

const port = process.env.PORT || 8080;

// Importação das rotas
app.use("/api/categoriaproduto", require("./routes/categoriaProdutoRoutes"));
app.use("/api/endereco", require("./routes/enderecoRoutes"));
app.use("/api/cliente", require("./routes/clienteRoutes"));
app.use("/api/contato", require("./routes/contatoRoutes"));
app.use("/api/tipousuario", require("./routes/tipoUsuarioRoutes"));
app.use("/api/usuario", require("./routes/usuarioRoutes"));
app.use("/api/fornecedor", require("./routes/fornecedorRoutes"));
app.use("/api/contas", require("./routes/contasRoutes"));
app.use("/api/produto", require("./routes/produtoRoutes"));
app.use("/api/estoque", require("./routes/estoqueRoutes"));
app.use("/api/venda", require("./routes/vendaRoutes"));
app.use("/api/itemvenda", require("./routes/itemVendaRoutes"));
app.use("/api/relatorios", require("./routes/relatorioRoutes"));
app.use("/api/representante", require("./routes/representanteRoutes"));
app.use("/api/relatorio", require("./routes/geradorRelatorioRoutes"));
app.use("/api/receber", require("./routes/receberRoutes"));

// Rota de teste para verificar se a API está rodando
app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
