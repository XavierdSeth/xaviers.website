import { AboutCard } from "./components/AboutCard.jsx";
import { EducationCard } from "./components/EducationCard.jsx";
import { LinksCard } from "./components/LinksCard.jsx";
import { LocationCard } from "./components/LocationCard.jsx";
import { MinecraftCard } from "./components/MinecraftCard.jsx";
import { NotesCard } from "./components/NotesCard.jsx";
import { ProfileCard } from "./components/ProfileCard.jsx";
import "./App.css";

export default function App() {
  return (
    <div className="page">
      <main className="site-grid">
        <ProfileCard />
        <AboutCard />
        <EducationCard />
        <LinksCard />
        <LocationCard />
        <NotesCard />
        <MinecraftCard />
      </main>
    </div>
  );
}
