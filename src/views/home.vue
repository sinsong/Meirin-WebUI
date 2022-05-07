<template>
  <h1 class="mt-4">Meirin ABAC System</h1>
  <p>欢迎使用美玲访问控制系统！</p>

  <h2>概念</h2>

  <table class="table table-hover table-dark caption-top w-auto">
    <caption>访问控制<strong>概念</strong></caption>
    <thead>
      <tr>
        <th scope="col">概念</th>
        <th scope="col">含义</th>
        <th scope="col">解释</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>subject</td>
        <td>主体</td>
        <td>发起访问请求的自然人或非自然人</td>
      </tr>
      <tr>
        <td>object</td>
        <td>客体</td>
        <td>被访问控制系统保护的资源实体</td>
      </tr>
      <tr>
        <td>action</td>
        <td>动作</td>
        <td>请求访问的方式</td>
      </tr>
      <tr>
        <td>environment</td>
        <td>环境因素</td>
        <td>访问请求相关的环境因素</td>
      </tr>
    </tbody>
  </table>

  <table class="table table-hover table-dark caption-top w-auto">
    <caption>决策推导算法 | 元策略模式</caption>
    <thead>
      <tr>
        <th scope="col">值</th>
        <th scope="col">含义</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>deny-overrides</code></td>
        <td><strong>拒绝</strong>优先</td>
      </tr>
      <tr>
        <td><code>permit-overrides</code></td>
        <td><strong>允许</strong>优先</td>
      </tr>
      <tr>
        <td><code>deny-unless-permit</code></td>
        <td>deny 优先，permit 兜底</td>
      </tr>
      <tr>
        <td><code>permit-unless-deny</code></td>
        <td>permit 优先，deny 兜底</td>
      </tr>
    </tbody>
  </table>

  <table class="table table-hover table-dark caption-top w-auto">
    <caption>访问控制<strong>决策</strong></caption>
    <thead>
      <tr>
        <th scope="col">决策</th>
        <th scope="col">含义</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>permit</code></td>
        <td>允许</td>
      </tr>
      <tr>
        <td><code>deny</code></td>
        <td>拒绝</td>
      </tr>
      <tr>
        <td><code>indeterminate</code></td>
        <td>不可判定</td>
      </tr>
      <tr>
        <td><code>notapplicable</code></td>
        <td>无可用策略</td>
      </tr>
    </tbody>
  </table>

  <h2>模型</h2>

  <table class="table table-hover table-dark caption-top w-auto">
    <caption>元策略</caption>
    <thead>
      <tr>
        <th scope="col">字段</th>
        <th scope="col">含义</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>id</code></td>
        <td>标识符</td>
      </tr>
      <tr>
        <td><code>name</code></td>
        <td>名称</td>
      </tr>
      <tr>
        <td><code>match</code></td>
        <td>匹配表达式</td>
      </tr>
      <tr>
        <td><code>mode</code></td>
        <td>模式</td>
      </tr>
    </tbody>
  </table>

  <table class="table table-hover table-dark caption-top w-auto">
    <caption>策略</caption>
    <thead>
      <tr>
        <th scope="col">字段</th>
        <th scope="col">含义</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>id</code></td>
        <td>标识符</td>
      </tr>
      <tr>
        <td><code>name</code></td>
        <td>名称</td>
      </tr>
      <tr>
        <td><code>group</code></td>
        <td>所属策略组（元策略）</td>
      </tr>
      <tr>
        <td><code>match</code></td>
        <td>匹配表达式</td>
      </tr>
      <tr>
        <td><code>effect</code></td>
        <td>策略效果</td>
      </tr>
    </tbody>
  </table>

  <h2>Meirin 策略 DSL</h2>

  顶层结构为布尔运算：

  <pre class="my-2">expr -> or_expr

or_expr -> and_expr
    | or_expr || or_expr

and_expr -> equ_expr
    | and_expr && equ_expr
</pre>

  支持常见比较和关系算符

  <pre class="my-2">expr == expr
expr != expr

expr &lt; expr
expr &gt; expr
expr &lt;= expr
expr &gt;= expr
</pre>

  前缀算符

  <pre class="my-2">! expr</pre>

  后缀算符

  <pre class="my-2">expr.expr           成员访问
expr(arglist, ...)  函数调用
</pre>

  特殊对象

  <pre class="my-2">subject      主体对象
object       客体对象
action       动作对象
environment  环境对象
</pre>

<footer class="py-2 my-4 border-top">
  <p>&copy; 2022 literal. All rights reserved.</p>
</footer>
</template>
