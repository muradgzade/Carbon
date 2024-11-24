import "./news-section.scss";
import { Link } from "react-router-dom";

const data = [
  {
    image:
      "https://static.euronews.com/articles/stories/08/76/95/76/320x180_cmsv2_03b3acf6-ef0b-5085-8798-8a5794b448a6-8769576.jpg",
    title: "Meet Narmin Jarchalova: The woman behind COP29 preparations",
  },
  {
    image:
      "https://static.euronews.com/articles/stories/08/87/01/00/1024x576_cmsv2_fbef0588-eae1-517c-851c-924682d433cf-8870100.jpg",
    title: "Summit ends with $300bn a year climate finance deal",
  },
  {
    image:
      "https://static.euronews.com/articles/stories/08/86/67/08/320x180_cmsv2_7c644a1c-28fa-51c2-b3e3-b5e7e63f6906-8866708.jpg",
    title:
      "Brussels, my love? After Baku - Has the COP process run its course?",
  },
  {
    image:
      "https://static.euronews.com/articles/stories/08/86/92/58/320x180_cmsv2_291ca7d3-8a8a-5b24-be39-44c9a700d506-8869258.jpg",
    title: "COP 29: Brazil warns no deal unless rich states up finance targets",
  },
  {
    image:
      "https://static.euronews.com/articles/stories/08/86/95/32/320x180_cmsv2_1a4cf049-d892-501f-b08c-37bae0f3eb9b-8869532.jpg",
    title: "Globe cuts deal on climate in Baku after hours of wrangling",
  },
  {
    image:
      "https://static.euronews.com/articles/stories/08/86/82/30/320x180_cmsv2_b428cdd3-a394-5f5c-828b-6d6f0d513404-8868230.jpg",
    title: "Azerbaijan proposes $250bn annual climate finance target",
  },
];

export default function News() {
  return (
    <div className="news__container">
      <div className="news__wrapper">
        <h2>Today's News</h2>
        <div className="news">
          <div className="news__row">
            {data.slice(0, 3).map((item, index) => (
              <Link to="/" className="news__content" key={index}>
                <img src={item.image} alt={item.title} />
                <p>{item.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
