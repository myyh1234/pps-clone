import './ProblemPage.css';
import { Link, useParams } from 'react-router';
import PageNotFound from './404.js';

function getProblemInfo(id) {
  const problems = [
    { id: 1, title: "HCPC 팀 짜기", author: "robert334", result: "ac", timeLimit: 1000, memoryLimit: 1024, solveCount: 32, get statement() { return this.title; }, input: "입력은 mouse force", output: "문제의 제목을 출력하라.", get example() { const a = []; for (let i = 1; i <= 2; i++) { a.push({in: this.title + ' in #' + i + '\n', out: this.title + ' out #' + i})} return a; } },
    { id: 2, title: "흑백조경사", author: "myyh1234", result: "no", timeLimit: 2000, memoryLimit: 1024, solveCount: 23, get statement() { return this.title; }, input: "입력은 mouse force", output: "문제의 제목을 출력하라.", get example() { const a = []; for (let i = 1; i <= 1; i++) { a.push({in: this.title + ' in #' + i + "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea comm", out: this.title + ' out #' + i})} return a; } },
    { id: 3, title: "아무나 풀어주세요", author: "thak00", result: "no", timeLimit: 2000, memoryLimit: 1024, solveCount: 25, get statement() { return this.title; }, input: "입력은 mouse force", output: "문제의 제목을 출력하라.", get example() { const a = []; for (let i = 1; i <= 1; i++) { a.push({in: this.title + ' in #' + i, out: this.title + ' out #' + i})} return a; } },
    { id: 4, title: "순열 복원", author: "paull04", result: "ac", timeLimit: 2000, memoryLimit: 1024, solveCount: 92, get statement() { return this.title; }, input: "입력은 mouse force", output: "문제의 제목을 출력하라.", get example() { const a = []; for (let i = 1; i <= 3; i++) { a.push({in: this.title + ' in #' + i, out: this.title + ' out #' + i})} return a; } },
    { id: 5, title: "수열과 쿼리 HY", author: "myyh1234", result: "wa", timeLimit: 2000, memoryLimit: 1024, solveCount: 50, get statement() { return this.title; }, input: "입력은 mouse force", output: "문제의 제목을 출력하라.", get example() { const a = []; for (let i = 1; i <= 2; i++) { a.push({in: this.title + ' in #' + i, out: this.title + ' out #' + i})} return a; } },
    { id: 6, title: "수수수수퍼노바", author: "ramzxc", result: "ac", timeLimit: 1000, memoryLimit: 1024, solveCount: 231, get statement() { return this.title; }, input: "입력은 mouse force", output: "문제의 제목을 출력하라.", get example() { const a = []; for (let i = 1; i <= 1; i++) { a.push({in: this.title + ' in #' + i, out: this.title + ' out #' + i})} return a; } },
    { id: 7, title: "돌 게임 nm", author: "paull04", result: "ac", timeLimit: 1000, memoryLimit: 1024, solveCount: 32, get statement() { return this.title; }, input: "입력은 mouse force", output: "문제의 제목을 출력하라.", get example() { const a = []; for (let i = 1; i <= 1; i++) { a.push({in: this.title + ' in #' + i, out: this.title + ' out #' + i})} return a; } },
    { id: 8, title: "덧셈 팰린드롬 수열과 트리", author: "thak00", result: "no", timeLimit: 1000, memoryLimit: 1024, solveCount: 89, get statement() { return this.title; }, input: "입력은 mouse force", output: "문제의 제목을 출력하라.", get example() { const a = []; for (let i = 1; i <= 1; i++) { a.push({in: this.title + ' in #' + i, out: this.title + ' out #' + i})} return a; } },
    { id: 9, title: "나연 정렬", author: "myyh1234", result: "wa", timeLimit: 2000, memoryLimit: 1024, solveCount: 77, get statement() { return this.title; }, input: "입력은 mouse force", output: "문제의 제목을 출력하라.", get example() { const a = []; for (let i = 1; i <= 2; i++) { a.push({in: this.title + ' in #' + i, out: this.title + ' out #' + i})} return a; } },
    { id: 10, title: "간선을 하나 그어서 루트까지 거리의 합을 최소로 만들기로 했습니다", author: "paull04", result: "no", timeLimit: 2000, memoryLimit: 1024, solveCount: 12, get statement() { return this.title; }, input: "입력은 mouse force", output: "문제의 제목을 출력하라.", get example() { const a = []; for (let i = 1; i <= 2; i++) { a.push({in: this.title + ' in #' + i, out: this.title + ' out #' + i})} return a; } }
  ]
  return problems[id-1];
}

export default function ProblemPage() {
  const { id } = useParams();
  const problem = getProblemInfo(id);
  if (!problem) return <PageNotFound />
  
  return (
    <main>
      <ProblemInfoBox problem={problem} />
      <ProblemStatement problem={problem} />
    </main>
  );
  
}

function ProblemInfoBox({ problem }){

  return (
    <div className='problemInfo'>
      <h1 style={{ marginBottom: '0' }}>{problem.title}</h1>
      <div style={{ marginBottom: '1em' }}><Link to={'/user/' + problem.author} className='author'>{'@' + problem.author}</Link></div>
      <div className='limits'>시간 제한: {problem.timeLimit / 1000}초 / 메모리 제한: {problem.memoryLimit}MB</div>
    </div>
  );
}

function ProblemStatement({ problem }) {
  const examples = problem.example;
  const exampleTable = examples.map(
    (x, idx) => (
      <tr key={idx}>
        <td><div>{x.in}</div></td>
        <td><div>{x.out}</div></td>
      </tr>
    )
  );
  return (
    <article>
      <StatementSection header={"문제"} body={problem.statement} />
      <StatementSection header={"입력"} body={problem.input} />
      <StatementSection header={"출력"} body={problem.output} />

      <section>
        <h3>입출력 예시</h3>
        <table className='example'>
          <thead>
            <tr>
              <th>입력</th>
              <th>출력</th>
            </tr>
          </thead>
          <tbody>
            {exampleTable}
          </tbody>
        </table>
      </section>
    </article>
  );
}

function StatementSection({ header, body }){
  return (
    <section>
      <h3 className='statementHeader'>{header}</h3>
      <div className='statementBody'>{body}</div>
    </section>
  )
}