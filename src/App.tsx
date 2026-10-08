import { useEffect, useMemo, useState } from "react";

type Book={id:number;title:string;author:string;genre:string;description:string};
const books:Book[]=[
{ id:1,title:"The Midnight Library",author:"Matt Haig",genre:"Fiction",description:"A library between life and death offers infinite possible lives."},
{ id:2,title:"A Brief History of Time",author:"Stephen Hawking",genre:"Science",description:"A clear journey through cosmology, time, black holes and the universe."},
{ id:3,title:"The Hobbit",author:"J.R.R. Tolkien",genre:"Fantasy",description:"Bilbo leaves home for an unexpected adventure with dwarves and a wizard."},
{ id:4,title:"Sapiens",author:"Yuval Noah Harari",genre:"History",description:"A sweeping story of how Homo sapiens shaped the world."},
{ id:5,title:"The Silent Patient",author:"Alex Michaelides",genre:"Mystery",description:"A therapist becomes determined to understand a woman's unexplained silence."},
{ id:6,title:"Educated",author:"Tara Westover",genre:"Biography",description:"A memoir about education, family and finding an independent path."},
{ id:7,title:"Dune",author:"Frank Herbert",genre:"Science Fiction",description:"An epic struggle for survival and power on the desert planet Arrakis."},
{ id:8,title:"Becoming",author:"Michelle Obama",genre:"Biography",description:"A personal memoir tracing family, work and public life."},
{ id:9,title:"Atomic Habits",author:"James Clear",genre:"Self-Help",description:"Practical ideas for building better habits through small changes."},
{ id:10,title:"Pride and Prejudice",author:"Jane Austen",genre:"Romance",description:"A witty classic about Elizabeth Bennet, Darcy and first impressions."},
{ id:11,title:"The Martian",author:"Andy Weir",genre:"Science Fiction",description:"An astronaut uses science and ingenuity to survive alone on Mars."},
{ id:12,title:"The Book Thief",author:"Markus Zusak",genre:"Historical Fiction",description:"A young reader finds comfort and courage in books during wartime Germany."},
{ id:13,title:"Thinking, Fast and Slow",author:"Daniel Kahneman",genre:"Science",description:"An exploration of the two systems that shape human judgement."},
{ id:14,title:"Circe",author:"Madeline Miller",genre:"Fantasy",description:"A powerful retelling of the Greek myth of the witch Circe."},
{ id:15,title:"The Alchemist",author:"Paulo Coelho",genre:"Fiction",description:"A shepherd follows a dream and discovers lessons about purpose."},
{ id:16,title:"Gone Girl",author:"Gillian Flynn",genre:"Mystery",description:"A disappearance turns a marriage into a tense investigation."},
{ id:17,title:"The Kite Runner",author:"Khaled Hosseini",genre:"Historical Fiction",description:"A moving story of friendship, betrayal and redemption."},
{ id:18,title:"Normal People",author:"Sally Rooney",genre:"Romance",description:"Two young people navigate love, friendship and adulthood."},
{ id:19,title:"The Design of Everyday Things",author:"Don Norman",genre:"Design",description:"A practical introduction to human-centred product design."},
{ id:20,title:"Braiding Sweetgrass",author:"Robin Wall Kimmerer",genre:"Nature",description:"Science and Indigenous wisdom meet in a celebration of the natural world."},
{ id:21,title:"Long Walk to Freedom",author:"Nelson Mandela",genre:"Biography",description:"An autobiography covering childhood, struggle and leadership."},
{ id:22,title:"Project Hail Mary",author:"Andy Weir",genre:"Science Fiction",description:"A lone astronaut wakes with no memory of a mission to save humanity."},
{ id:23,title:"The Great Gatsby",author:"F. Scott Fitzgerald",genre:"Fiction",description:"A classic tale of ambition, wealth, love and the American dream."},
{ id:24,title:"Little Women",author:"Louisa May Alcott",genre:"Fiction",description:"Four sisters grow up, dream and find their own paths."}
];

const key="community-library-reading-list";
function cover(id:number){return `https://picsum.photos/seed/community-book-${id}/300/450`}

export default function App(){
 const [query,setQuery]=useState("");
 const [genre,setGenre]=useState("All");
 const [saved,setSaved]=useState<number[]>(()=>{try{return JSON.parse(localStorage.getItem(key)||"[]")}catch{return[]}});
 const [dark,setDark]=useState(()=>localStorage.getItem("community-library-theme")==="dark");
 const [suggested,setSuggested]=useState(false);
 const [error,setError]=useState("");
 useEffect(()=>{localStorage.setItem(key,JSON.stringify(saved))},[saved]);
 useEffect(()=>{document.documentElement.classList.toggle("dark",dark);localStorage.setItem("community-library-theme",dark?"dark":"light")},[dark]);
 const genres=["All",...Array.from(new Set(books.map(b=>b.genre))).sort()];
 const visible=useMemo(()=>books.filter(b=>(genre==="All"||b.genre===genre)&&(!query.trim()||b.title.toLowerCase().includes(query.toLowerCase())||b.author.toLowerCase().includes(query.toLowerCase()))),[query,genre]);
 const toggle=(id:number)=>setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
 function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setError("");const f=new FormData(e.currentTarget);const title=String(f.get("title")||"").trim();const author=String(f.get("author")||"").trim();const g=String(f.get("genre")||"");if(title.length<2||author.length<2||!g){setError("Please enter a title, author and genre.");setSuggested(false);return}setSuggested(true);e.currentTarget.reset()}
 return <div className="app">
  <header><div className="brand"><span className="logo">📚</span><div><strong>Community Library</strong><small>Run by volunteers, loved by readers</small></div></div><button className="theme" onClick={()=>setDark(!dark)} aria-label="Toggle dark mode">{dark?"☀️":"🌙"}</button></header>
  <main>
   <section className="hero"><h1>Welcome to your community library</h1><p>Browse {books.length} books, search the shelves, save your favourites and suggest a new title.</p></section>
   <section className="controls" aria-label="Search and filter"><input aria-label="Search by title or author" type="search" placeholder="Search by title or author…" value={query} onChange={e=>setQuery(e.target.value)}/><select aria-label="Filter by genre" value={genre} onChange={e=>setGenre(e.target.value)}>{genres.map(g=><option key={g}>{g}</option>)}</select></section>
   <section><div className="section-title"><h2>Catalogue</h2><span>{visible.length} of {books.length} books</span></div>{visible.length?<div className="grid">{visible.map(book=><article className="card" key={book.id}><img src={cover(book.id)} alt={`Cover of ${book.title}`} loading="lazy"/><div className="card-body"><span className="tag">{book.genre}</span><h3>{book.title}</h3><p className="author">by {book.author}</p><p>{book.description}</p><button onClick={()=>toggle(book.id)} className={saved.includes(book.id)?"saved":""}>{saved.includes(book.id)?"✓ Saved to reading list":"＋ Save to reading list"}</button></div></article>)}</div>:<div className="empty">No books found. Try another search or genre.</div>}</section>
   <section className="reading"><h2>Your reading list</h2>{saved.length?<ul>{books.filter(b=>saved.includes(b.id)).map(b=><li key={b.id}><span><strong>{b.title}</strong><small>{b.author} · {b.genre}</small></span><button onClick={()=>toggle(b.id)}>Remove</button></li>)}</ul>:<div className="empty">Your reading list is empty. Save a book above to add it here.</div>}</section>
   <section className="suggest"><h2>Suggest a book</h2><p>Know a book our library should stock? Let the volunteers know.</p>{suggested&&<div className="success" role="status">✓ Thank you! Your suggestion has been noted.</div>}{error&&<div className="error" role="alert">{error}</div>}<form onSubmit={submit}><label>Book title *<input name="title" placeholder="e.g. The Midnight Library"/></label><label>Author *<input name="author" placeholder="e.g. Matt Haig"/></label><label>Genre *<select name="genre" defaultValue=""><option value="">Choose a genre…</option>{genres.slice(1).map(g=><option key={g}>{g}</option>)}<option>Other</option></select></label><button className="submit">Send suggestion</button></form></section>
  </main><footer>Community Library Catalogue — a volunteer project prototype.</footer>
 </div>
}