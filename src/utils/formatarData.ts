// utilitário para criar nova data no formato padrão new Date() e para formatação

export function novaData() {
  let novaData = new Date();
  let dia = novaData.getDate().toString().padStart(2, '0');
  let mes = (novaData.getMonth() + 1).toString().padStart(2, '0');
  let ano = novaData.getFullYear();
  return `${ano}-${mes}-${dia}`;
}

export function formatarData(data: string) {
  let novaData = new Date(data + ' 00:00:00');
  let dia = novaData.getDate().toString().padStart(2, '0');
  let mes = (novaData.getMonth() + 1).toString().padStart(2, '0');
  let ano = novaData.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
