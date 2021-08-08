import Color from 'color';

function seletorCoresChakra(novaCor: string) {
  const padraoEscuro = {
    passo: (50 - 10) / 4,
    rotacao: 0 / 4,
    saturacao: 0 / 4,
  };
  const padraoClaro = {
    passo: (95 - 50) / 5,
    rotacao: 0 / 5,
    saturacao: 0 / 5,
  };
  const scale = {
    50: Color(novaCor)
      .lightness(50 + padraoClaro.passo * 5)
      .rotate(padraoClaro.rotacao * 5)
      .saturate(padraoClaro.saturacao * 5)
      .hex(),
    100: Color(novaCor)
      .lightness(50 + padraoClaro.passo * 4)
      .rotate(padraoClaro.rotacao * 4)
      .saturate(padraoClaro.saturacao * 4)
      .hex(),
    200: Color(novaCor)
      .lightness(50 + padraoClaro.passo * 3)
      .rotate(padraoClaro.rotacao * 3)
      .saturate(padraoClaro.saturacao * 3)
      .hex(),
    300: Color(novaCor)
      .lightness(50 + padraoClaro.passo * 2)
      .rotate(padraoClaro.rotacao * 2)
      .saturate(padraoClaro.saturacao * 2)
      .hex(),
    400: Color(novaCor)
      .lightness(50 + padraoClaro.passo * 1)
      .rotate(padraoClaro.rotacao * 1)
      .saturate(padraoClaro.saturacao * 1)
      .hex(),
    500: Color(novaCor).lightness(50).hex(),
    600: Color(novaCor)
      .lightness(50 - padraoEscuro.passo * 1)
      .rotate(padraoEscuro.rotacao * 1)
      .saturate(padraoEscuro.saturacao * 1)
      .hex(),
    700: Color(novaCor)
      .lightness(50 - padraoEscuro.passo * 2)
      .rotate(padraoEscuro.rotacao * 2)
      .saturate(padraoEscuro.saturacao * 2)
      .hex(),
    800: Color(novaCor)
      .lightness(50 - padraoEscuro.passo * 3)
      .rotate(padraoEscuro.rotacao * 3)
      .saturate(padraoEscuro.saturacao * 3)
      .hex(),
    900: Color(novaCor)
      .lightness(50 - padraoEscuro.passo * 4)
      .rotate(padraoEscuro.rotacao * 4)
      .saturate(padraoEscuro.saturacao * 4)
      .hex(),
  };
  return scale;
}
