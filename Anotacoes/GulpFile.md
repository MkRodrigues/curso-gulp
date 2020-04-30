# Gulp e Automação Front-end
<br>
Para usar o Gulp e o pacote precisamos requerir os pacotes, atribuindo-os à variáveis para uso posterior
const gulp = require('gulp');

const browserSync = require('browser-sync').create();

function compilaSass() {
    // Uma função do Gulp deve sempre conter um retorno com o que se espera que a função exerça, abaixo a função:
    // Recebe um gulp src responsável por linkar quais arquivos devem ser tratados, logo após a função pipe, indica que a função sass craida na variável acima usará o pacote gulp-sass, e ao final a função pipe se encarrega através da função dest(destino/destribuição) de enviar o arquivo para o diretório solicitado.
    // O símbolo \* antes da extensão indica à função compilaSass que todos os arquivos dentro do diretório que conterem a extensão scss devem ser compilados para css. Também podemos usar a mesma classificação para indicar um diretório, caso a pasta anterior a esta também contenha arquivos com extensão scss.
    // Ex.: gulp.src('css/scss/\*\*/\*.scss')
    // O atributo {outputStyle: 'compressed'} indica que o arquivo dese ser minificado na saída
    return gulp.src('css/scss/\*.scss').pipe(sass({ outputStyle: "compressed" })).pipe(autoprefixer({ cascade: false })).pipe(gulp.dest('css/'));
}

// Para ativar a função criada, esta deve ser inserida numa task/tarefa, com um nome de tarefa (sass), ao qual será usado pelo pacote gulp via cmd quando chamado. contendo como próximo argumento o nome da funcção criada (compilaSass)
gulp.task('sass', compilaSass);

// Para evitar linhas de código, podemos escrever uma função anônima já inclusa numa task. Obs.: Somente uma tarefa pode ser passada, para executar várias tarefas em uma única função, faça da forma padrão
// gulp.task('watch', function () {
//     gulp.watch('css/scss/\*.scss', ['compilaSass']);
// });

// A função watch do gulp é responsável por ficar "/escutando", determinados diretórios ou arquivos, e na menor possibilidade de mudança, são executadas. Uma watch pode conter dentro de gulp.watch('') outras tasks, que podem ser executadas em série, ou paralelamente, quando ouverem mudanças em tais arquivos.Ex.: gulp.watch('css/scss/\*.scss', gulp.series('tarefa1', 'tarefa2'))

function watch() {
    gulp.watch('css/scss/\*.scss', compilaSass);
};

// Uma tarefa Default é a tarefa Padrão que é chamada via bash através do comando gulp, esta pode conter somente a chamda para a task padrão, como ter outras tasks após ela. A mesma possui dois parâmetros "series, parallel" que podem ser usadas para determinar o fluxo que as tarefas serão aplicadas, como em série, onde as tarefas são executadas uma após a outra, ou todas ao mesmo tempo "paralelamente"
// gulp.task('default', watch)

function browser() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
};

gulp.task('browserSync', browser);
gulp.task('default', gulp.parallel('watch', 'browserSync'));

<br>
<br>
#### Package BrowserSync

**O pacote browser-sync, cria uma conexão via servidor disponibilizando os arquivos passados em função para que sejam rendereizados automaticamente via Browser.**
**O links de servidor disponibilizados dá a opção de serem acessados por todos os dispositivos conectados na mesma rede (celulares, computadore).**

dando a opção de podermos acessar o servidor em vários dispositivos (celulares, notebooks, computadores) que estejam conectados na mesma rede wi-fi Este também possiilita através da função Stream, que arquivos css sejam renderizaos sem que a página toda seja carregada, e através do atributo reload, arquivos html, php, etc, podem ser renderizados
Para atualizar o Html automaticamente não podemos inserir mais de um elemento na função Watch, como neste exemplo:
<br>
``` javascript
function watch() {
    gulp.watch('css/scss/*.scss', compilaSass);
    gulp.watch('*.html', browserSync);
};
```
<br>
pois a função Watch não permite esse argumento para o BrowserSync, sendo necessário o uso da função .on('change'), que fará uma ação quando o elemento em watch for alterado:

<br>
```
function watch() {
    gulp.watch('css/scss/*.scss', compilaSass);
    gulp.watch('*.html').on('change', browserSync.reload);
};
```
<br>
O método reload (atributo da função BrowserSync, é responsável por recarregar a página, quando alterada).

Também podemos alterar a função wacth para "escutar" outras extensões do diretório, passando para o parâmetro .watch um Array das extensões desejadas:
<br>
```
function watch() {
    gulp.watch('css/scss/*.scss', compilaSass);
    gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);
};
```

Uma função que modifica um arquvo, deve retornar o arquivo na primeira linha

#### Package Concat

**O pacote Concat, concatena pequenos pedaços de arquivos Javascript, e retona em um único arquivo todos esses arquivos mergidos.**

<span class="colour" style="color:rgb(199, 146, 234)"></span>forma errada

``` javascript
function gulpJs() {
    return gulp.src('js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js/'));
}
```

Obs.: A função Concat, recebe como primeiro parâmetro o output do arquivo final *main.js*

Note que o código acima está redirecionando o arquivo final Main.js para a mesma pasta onde está buscando os arquivos que serão concatenados. Esta ação pode gerar um loop infinito na linha de comando, visto que toda vez que o arquivo main.js for gerado, a função watch perceberá uma mudança e concatenará os arquivos novamente. Para corrigir, redirecione or aquivos para um <b>*diretório* *diferente*</b>, ou sinalize à função que este arquivo deve ser ignorado inserindo os parâmetros em vetor: `gulp.watch(['js/*.js', '!js/main.js']);`

<span class="colour" style="color:rgb(199, 146, 234)">Forma correta</span>

```
function gulpJs() {
    return gulp.src('js/assets_js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js/'));
}
```
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
