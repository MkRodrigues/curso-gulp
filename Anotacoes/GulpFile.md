# Gulp e Automação Front-end

## Automação Front-End

Lorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsunLorem ipsun

## GULP

<i>**Documentação Gulp - Get Started:**</i>  [*https://gulpjs.com/docs/en/getting-started/quick-start*](https://gulpjs.com/docs/en/getting-started/quick-start)
**Para que as funcionalidades do pacote Gulp possam ser utilizadas, precisamos seguir os seguintes passos:**

Precisamos verificar se os seguintes programas estão instalados na máquina, atravé dos comandos via Bash/CMD:

``` javascript
        node --version
        npm --version
        npx --version
```

Os comandos acima serão responsáveis por mostrar ao usuário a versão atual dos programas Node, e do gerenciador de pacotes NPM e NPX. Caso a mensagem retornada indique que tais comando não foram encontrados os pacotes em questão devem ser instalados.

**Instalação Gulp Package**
Para efetuar a instalação do Pacote Gulp, via linha de comando:

``` javascript
        npm install --global gulp-cli
```

Obs.: O pacote acima será instalado globalmente, mas para que o pacote gulp funcione corretamente uma versão do mesmo deve ser instalada dentro do diretório do projeto que se trabalhará, através do comando:

``` javascript
        npm install gulp
```

Para verificar a versão do Gulp instalada, via CMD/Bash :

``` javascript
        gulp --version
```
<br>
O comando Gulp, na linha de comando, demonstra se o pacote foi instalado com sucesso, porém informará que configurações iniciais devem ser feitas para que o mesmo funcione corretamente:

``` javascript
autor@autor ~/diretório
$ gulp
[14:39:02] No gulp file found
```

Obs.: Se nenhum arquivo gulp foi criado anteriormente, a mensagem acima será mostrada, para resolver isso crie um arquivo gulpfile.js na pasta do projeto

Após criado, rode o comando novamente.

```
autor@autor ~/diretório
$ gulp
[16:43:56] Using gulpfile ~\Desktop\Origamid-2\Curso de Gulp\teste\gulpfile.js
[16:43:56] Task never defined: default
[16:43:56] To list available tasks, try running: gulp --tasks
```

Obs.: A mensagem acima informa que o arquivo criado não contém nenhuma tarefa que possa ser executada.

**Importando Gulp-Package**
Para criarmos uma nova tarefa, precisamos incluir a importação do pacote para dentro do arquivos **gulpfile,** abaixo podemos notar que essa importação pode ser feita de duas maneiras

**EC6+**

``` javascript
import { src, dest, task, watch as _watch, parallel } from 'gulp';
```
<br>
**EC6-**

``` javascript
const nomedaVariavel= require('pacoteInstaladoAnteriormente');
const gulp = require('gulp');
```

Para pacotes importados na versão ECMASCRIPT6+ podemos usar como variável/pipe o nome do próprio pacote importado.

**Criando uma tarefa**

``` javascript
function nomeFuncao() {
    return gulp.src('diretorio/')
        .pipe(execução)
        .pipe(gulp.dest('diretorio/'));
};
```
<br>
Toda função criada em Gulp, com a  funcionalidade de alterar um arquivo final, deve ter seu código escrito em um return, para que o código retornado seja brevemente executado.

Busca um/vários arquivo(s)/source de determinado diretório

``` javascript
gulp.src('diretorio')
```
<br>
Quando se precisa especificar vários arquivos de determinada extensão, podemos:

``` javascript
gulp.src('css/scss/*.scss')
```

Ou

```
gulp.src('css/scss/**/*.scss')
```

Busca todos os arquivos da mesma extensão dentro de um diretório anterior/posterior

**Definindo Pipes/Canos:**
Uma pipe, como o próprio nome especifíca, redireciona o código através de funções pré estabelecidas pelo pacote, para que este seja alterado conforme desejado:

``` javascript
.pipe(sass({ outputStyle: "compressed" }))
```

Vários pipes podem ser conectados uns aos outros através de pontos finais "."
A váriavel que recebe a importação do pacote, no início do arquivo **Gulpfile** deve conter seu nome dentro da pipe, referindo qual pacote deve ser utilizado.

Para que o arquivo alterado seja salvo em determinado diretório, podemos incluir a função dest('diretório'), do Gulp para tal:

``` javascript
.pipe(gulp.dest('diretorio/'));
```
<br>
**Gulp Tasks**
Uma task/tarefa executa a ação da função associada, através da linha de comando, quando chamada. Para definirmos uma task, podemos:

**EC6+**

``` javascript
exports.nomeDaTask= nomeDaFuncao;
```

Em versões acima do ECMASCRIPT 6, devemos definir o nome da Task com  o mesmo nome definido para a função, senão erros na linha de comando podem ser acionados.

**EC6-**

``` javascript
gulp.task('nomeDaTask', 'nomeDaFuncao');
gulp.task('browserSync', browser);
```

Já para versões abaixo do ECMASCRIPT 6, podemos definir um nome diferente (String) para a task, ao qual poderemos usar para chamar a Task na linha de comando

<br>
- - -

#### Package GULP-SASS

<i>**Documentação Gulp-Sass:**</i> [https://www.npmjs.com/package/gulp-sass](https://www.npmjs.com/package/gulp-sass)
**O pacote Gulp-Sass é responsável por transformar um ou vários arquivos scss, em css. Através da função podemos minificar os arquivos finais.**

Instalação Bash/CMD

``` javascript
npm install gulp-sass
```
<br>
Exemplo de Código:

``` javascript
function compilaSass() {
    return gulp.src('css/scss/*.scss')
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(gulp.dest('css/'))
};
```

O atributo {outputStyle: 'compressed'} indica que o arquivo final será minificado

Task:

``` javascript
exports.compilaSass, compilaSass;
```
<br>
<br>
- - -

#### GULP-WATCH
<br>
<br>
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
- - -

#### Package BrowserSync

**O pacote browser-sync, cria uma conexão via servidor disponibilizando os arquivos passados em função para que sejam rendereizados automaticamente via Browser.**
**Os links disponibilizados podem ser acessados por todos os dispositivos conectados na mesma rede de internet (celulares, computadores).**

Instalação:

<br>
<br>
Este também possiilita através da função Stream, que arquivos css sejam renderizaos sem que a página toda seja carregada, e através do atributo reload, arquivos html, php, etc, podem ser renderizados
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
``` javascript
function watch() {
    gulp.watch('css/scss/*.scss', compilaSass);
    gulp.watch('*.html').on('change', browserSync.reload);
};
```
<br>
O método reload (atributo da função BrowserSync, é responsável por recarregar a página, quando alterada).

Também podemos alterar a função wacth para "escutar" outras extensões do diretório, passando para o parâmetro .watch um Array das extensões desejadas:
<br>
``` javascript
function watch() {
    gulp.watch('css/scss/*.scss', compilaSass);
    gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);
};
```

Uma função que modifica um arquivo, deve retornar o arquivo na primeira linha

<br>
- - -

#### Package Concat

**O pacote Concat, concatena pequenos pedaços de arquivos Javascript, e retona em um único arquivo todos esses arquivos mergidos.**

*Forma Correta*

``` javascript
function gulpJs() {
    return gulp.src('js/assets_js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js/'));
}
```

Obs.: A função Concat, recebe como primeiro parâmetro o output do arquivo final \*main.js\<br>


*Forma Incorreta*

``` javascript
function gulpJs() {
    return gulp.src('js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('js/'));
}
```

Note que o código acima está redirecionando o arquivo final Main.js para a mesma pasta onde está buscando os arquivos que serão concatenados. Esta ação pode gerar um loop infinito na linha de comando, visto que toda vez que o arquivo main.js for gerado, a função watch perceberá uma mudança e concatenará os arquivos novamente. Para corrigir, redirecione or aquivos para um <b>*diretório* *diferente*</b>, ou sinalize à função que este arquivo deve ser ignorado inserindo os parâmetros em vetor: `gulp.watch(['js/*.js', '!js/main.js']);`
<br>
##### Ordem de Concatenação
<br>
**O pacote Concat concatena os arquivos por ordem alfabética, porém se uma outra ordem for desejada, insira os arquivos e seus respectivos diretórios em um array, definindo a ordem desejada:**

```
function gulpsJs() {
  return gulp.src(['./diretorio/arq3.js', './diretorio/arq1.js', './diretorio/arq2.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./diretorio/'));
});
```
<br>
<br>
- - -

#### Babel

**Compila o código Javascript moderno para versões de código javascript que sejam suportados por browsers não atualizados**

Instalação

```
npm install --save-dev gulp-babel @babel/core @babel/preset-env
```
<br>
Podemos usar o babel em uma função existente, que já trate arquivos Javascript com outras funções encadeadas:

```
function gulpJs() {
    return gulp.src('js/assets_js/*.js')
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('js/'));
}
```

Obs.: Note que o pacote Babel foi inserido após o pacote Concat, visto que sua inserção acima traria erros para o código, podendo fazer com que códigos sejam inseridos de forma duplicada, devido a concatenação trazer **blocos** de arquivos javascript.

<br>
- - -

#### Uglify

**O pacote Uglify minimiza arquivos Javascript.**
**Nota: Este pacote minifica arquivos de versões anteriores do Javascript (abaixo do Ecmascript 6), portanto para arquivos igual ou acima desta versão, usar o Pacote Gulp-uglify-es. No exemplo abaixo, estamos utlizando o Babel para converter arquivos Ecma 6 para versões abaixo, portanto funcionará normalmente**

<br>
```
function gulpJs() {
    return gulp.src('js/assets_js/*.js')
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.stream());
}
```

# Arrumar
<br>
<span class="colour" style="color:rgb(103, 110, 149)">*// import { src, dest, task, watch as \_watch, parallel } from 'gulp';*</span>
<span class="colour" style="color:rgb(103, 110, 149)">*// import sass from 'gulp-sass';*</span>
<span class="colour" style="color:rgb(103, 110, 149)">*// import autoprefixer from 'gulp-autoprefixer';*</span>
<span class="colour" style="color:rgb(103, 110, 149)">*// const browserSync = require('browser-sync').create();*</span>
<span class="colour" style="color:rgb(103, 110, 149)">*// import concat from 'gulp-concat';*</span>
<span class="colour" style="color:rgb(103, 110, 149)">*// import babel from 'gulp-babel';*</span>
<span class="colour" style="color:rgb(103, 110, 149)">*// import uglify from 'gulp-uglify';*</span>

<span class="colour" style="color:rgb(103, 110, 149)"></span>
<span class="colour" style="color:rgb(103, 110, 149)">*// EC6+ nome da task = nome da função*</span>
<span class="colour" style="color:rgb(137, 221, 255)">exports.</span><span class="colour" style="color:rgb(166, 172, 205)">sass </span><span class="colour" style="color:rgb(137, 221, 255)">=</span><span class="colour" style="color:rgb(166, 172, 205)"> </span><span class="colour" style="color:rgb(130, 170, 255)">compilaSass</span><span class="colour" style="color:rgb(137, 221, 255)">;</span>
<span class="colour" style="color:rgb(103, 110, 149)">*// EC6- gulp.task('sass', compilaSass);*</span>

<br>
<br>
<span class="colour" style="color:rgb(103, 110, 149)">*// EC6+ nome da task = nome da função*</span>
<span class="colour" style="color:rgb(103, 110, 149)">*// exports.mainJs = gulpJs;*</span>

<span class="colour" style="color:rgb(103, 110, 149)">*// Também posso definir o nome da task e função da mesma forma*</span>
<span class="colour" style="color:rgb(137, 221, 255)">exports.</span><span class="colour" style="color:rgb(166, 172, 205)">gulpJs </span><span class="colour" style="color:rgb(137, 221, 255)">=</span><span class="colour" style="color:rgb(166, 172, 205)"> </span><span class="colour" style="color:rgb(130, 170, 255)">gulpJs</span><span class="colour" style="color:rgb(137, 221, 255)">;</span>
<span class="colour" style="color:rgb(103, 110, 149)">*// EC6- gulp.task('mainJs', gulpJs);*</span>