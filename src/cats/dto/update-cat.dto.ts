/**
 * Data transfer object (Objeto de transferência de dados)
 * É um padrão de projeto de software usado para transferir dados
 * entre subsistemas de um software.
 */
interface UpdateCatDto {
  name?: string;
  owner?: string;
  created_at?: string;
  updated_at?: string;
}
export { UpdateCatDto };
