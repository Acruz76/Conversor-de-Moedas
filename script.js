const info = {
    BRL: { bandeira: '🇧🇷', nome: 'Real Brasileiro', locale: 'pt-BR' },
    USD: { bandeira: '🇺🇸', nome: 'Dólar Americano', locale: 'en-US' },
    EUR: { bandeira: '🇪🇺', nome: 'Euro', locale: 'de-DE' },
    GBP: { bandeira: '🇬🇧', nome: 'Libra Esterlina', locale: 'en-GB' },
    JPY: { bandeira: '🇯🇵', nome: 'Iene Japonês', locale: 'ja-JP' },
    CAD: { bandeira: '🇨🇦', nome: 'Dólar Canadense', locale: 'en-CA' },
    AUD: { bandeira: '🇦🇺', nome: 'Dólar Australiano', locale: 'en-AU' },
    CHF: { bandeira: '🇨🇭', nome: 'Franco Suíço', locale: 'de-CH' },
    CNY: { bandeira: '🇨🇳', nome: 'Yuan Chinês', locale: 'zh-CN' },
  };

  function fmt(valor, moeda) {
    return new Intl.NumberFormat(info[moeda].locale, {
      style: 'currency', currency: moeda, maximumFractionDigits: 2
    }).format(valor);
  }

  async function converter() {
    const de = document.getElementById('de').value;
    const para = document.getElementById('para').value;
    const valor = parseFloat(document.getElementById('valor').value);

    const elResultado = document.getElementById('resultado');
    const elErro = document.getElementById('erro');
    const elLoading = document.getElementById('loading');

    elResultado.classList.remove('visivel');
    elErro.classList.remove('visivel');
    elLoading.classList.add('visivel');

    try {
     const res = await fetch(`https://economia.awesomeapi.com.br/json/last/${de}-${para}`);
     const data = await res.json();
     
     const chave = `${de}${para}`;
     const taxa = parseFloat(data[chave].bid);
     const convertido = valor * taxa;

     

      document.getElementById('bandeira-de').textContent = info[de].bandeira;
      document.getElementById('nome-de').textContent = info[de].nome;
      document.getElementById('valor-de').textContent = fmt(valor, de);

      document.getElementById('bandeira-para').textContent = info[para].bandeira;
      document.getElementById('nome-para').textContent = info[para].nome;
      document.getElementById('valor-para').textContent = fmt(convertido, para);

      elLoading.classList.remove('visivel');
      elResultado.classList.add('visivel');
    } catch (e) {
      elLoading.classList.remove('visivel');
      elErro.classList.add('visivel');
    }
  }