Hooks são uma nova adição ao React 16.8. Eles permitem que você use o state e outros recursos do React sem escrever uma classe.

Cada método de ciclo de vida frequentemente contêm uma mistura de lógicas que não se relacionam. Por exemplo, componentes podem pegar dados em componentDidMount e componentDidUpdate. Contudo, o método componentDidMount pode conter algumas lógicas não relacionadas que configuram event listeners, com a limpeza deles em componentWillUnmount. Código mutuamente relacionado, que mudam juntos, acabam ficando separados, mas trechos de código completamente não relacionados acabam ficando juntos em um único método. Isso torna muito fácil a introdução de bugs e inconsistências.

Em muitos casos não é possível quebrar esses componentes em pedaços menores porque a lógica com estado está espalhada por toda parte. Também é difícil de testá-los. Isso é uma das razões pelas quais muitas pessoas preferem combinar React com uma biblioteca separada de gerenciamento de estado. Contudo, isso frequentemente introduz muitas abstrações, requer que você pule entre arquivos diferentes, e faz com que a reutilização de componentes seja mais difícil.

Para resolver isso, Hooks permitem que você divida um componente em funções menores baseadas em pedaços que são relacionados (como configurar uma subscription ou captura de dados), em vez de forçar uma divisão baseada nos métodos de ciclo de vida. Você também pode optar por gerenciar o estado local com um reducer para torná-lo mais previsível

Classes Confundem tanto Pessoas quanto Máquinas
Além de deixar o reuso de código e a organização de código mais difícil, nós percebemos que classes podem ser uma grande barreira no aprendizado de React. Você tem que entender como o this funciona em JavaScript, o que pode ser diferente de como funciona na maioria das linguagens. Você tem que lembrar de fazer bind de event handlers. Sem propostas de sintaxe instáveis, o código pode ficar muito verboso. 

Classes apresentam problemas para ferramentas dos dias de hoje, também. Por exemplo, classes não minificam muito bem e elas fazem com que hot reloading funcione de forma inconsistente e não confiável. Nós queremos disponibilizar uma API que torne mais provável o código permanecer no caminho otimizável.

Para resolver esses problemas, Hooks permitem você usar mais das funcionalidades de React sem classes. Conceitualmente, componentes React sempre estiveram mais próximos de funções. Hooks adotam funções, mas sem sacrificar o espírito prático de React. Hooks provêem acesso a válvulas de escape imperativas e não requerem você a aprender técnicas complexas de programação funcional ou reativa.



        UseState
        Este exemplo renderiza um contador. Quando você clica no botão, ele incrementa o valor:

        //importação necessaria para o uso do useState, que substitui o this.state
        import React, { useState } from 'react';

        function Example() {
        // Declara uma nova variável de state, que chamaremos de "count"
        const [count, setCount] = useState(0);

        return (
            <div>
            <p>Voce clicou {count} vezes</p>
            <button onClick={() => setCount(count + 1)}>
                clica aqui
            </button>
            </div>
        );
        }

useState retorna um par: o valor do state atual e uma função que permite atualizá-lo. Você pode chamar essa função a partir de um manipulador de evento ou de qualquer outro lugar. É parecido com this.setState em uma classe, exceto que não mescla o antigo state com o novo.

O único argumento para useState é o state inicial. No exemplo acima, é 0 porque o contador começa do zero.   diferente do this.state, o state não precisa ser um objeto — apesar de que possa ser se você quiser. O argumento de state inicial é utilizado apenas durante a primeira renderização.


        Você pode utilizar o State Hook mais de uma vez em um único componente:

        function ExemploComVariosStates() {
            // Declara várias variáveis de state!
            const [age, setAge] = useState(42);
            const [fruit, setFruit] = useState('banana');
            const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
            // ...
        }

Mas, o que é um Hook?
Hooks são funções que permitem a você “ligar-se” aos recursos de state e ciclo de vida do React a partir de componentes funcionais. Hooks não funcionam dentro de classes — eles permitem que você use React sem classes.
React fornece alguns Hooks internos como useState. Você também pode criar os seus próprios Hooks para reutilizar o comportamento de state entre componentes diferentes.

        UseEffect
        O useEffect, adiciona a funcionalidade de executar efeitos colaterais através de um componente funcional. Segue a mesma finalidade do componentDidMount, componentDidUpdate, e componentWillUnmount em classes React.

        Por exemplo, este componente define o título da página após o React atualizar o DOM:

        import React, { useState, useEffect } from 'react';

        function Example() {
        const [count, setCount] = useState(0);

        // Similar a componentDidMount e componentDidUpdate:
        useEffect(() => {
            // Atualiza o título do documento utilizando a API do navegador
            document.title = `You clicked ${count} times`;
        }); se voce passar uma variavel aqui o use effect vai ser rodado quando houver uma mudança nesta variavel, porem se voce deixar um array vazio [] ele vai simular o componentDidMount sendo executado apenas uma vez quando a pagina for montada

        return (
            <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
            </div>
        );
        }

Quando você chama useEffect, você está dizendo ao React para executar a sua função de “efeito” após liberar as mudanças para o DOM. Efeitos são declarados dentro do componente, para que eles tenham acesso as suas props e state. Por padrão, React executa os efeitos após cada renderização — incluindo a primeira renderização.

Criar seus próprios Hooks permite que você extraia a lógica de um componente em funções reutilizáveis.

Um Hook customizado é uma função JavaScript cujo nome começa com ”use” e que pode utilizar outros Hooks. Por exemplo, useFriendStatus abaixo é nosso primeiro Hook customizado:

        import React, { useState, useEffect } from 'react';

        function useFriendStatus(friendID) {
        const [isOnline, setIsOnline] = useState(null);

        useEffect(() => {
            function handleStatusChange(status) {
            setIsOnline(status.isOnline);
            }

            ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
            return () => {
            ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
            };
        });

        return isOnline;
        }

Não há nenhuma novidade nele - a lógica foi copiada dos componentes acima. Assim como em um componente, certifique-se de apenas chamar outros Hooks fora de condições e no nível mais alto do seu Hook customizado.

Diferente de um componente React, um Hook customizado não precisa ter uma assinatura específica. Podemos decidir o que ele recebe como argumentos e o que ele retorna, caso necessário. Em outras palavras, é como uma função normal. Seu nome deve sempre começar com use para que você possa ver de forma fácil que as regras dos Hooks se aplicam a ele.

        Usando um Hook Customizado

        function useFriendStatus(friendID) {
        const [isOnline, setIsOnline] = useState(null);

        // ...

        return isOnline;
        }

Existem outro hooks que nao vao ser tao utilizados.

        DOC: https://pt-br.reactjs.org/docs/hooks-overview.html


        ------------------- INFOS ALEATORIAS -------------------
    Criar um projeto
        create-react-app nome