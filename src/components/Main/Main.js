import "./Main.css"
import { Hero } from "./Sections/Hero/Hero"
import { About } from "./Sections/About/About"
import { Tech } from "./Sections/Tech/Tech"
import { Student } from "./Sections/Student/Student"

export const Main = () =>{
    return <main>
        <Hero/>
        <About/>
        <Tech/>
        <Student/>
    </main>
}
