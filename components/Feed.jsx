"use client"

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const searchResult = filterPrompts(e.target.value);
    setSearchedResults(searchResult);
    console.log("target:", e.target.value);
    console.log(searchedResults);
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);

    setSearchedResults(filterPrompts(tag));
  }

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    console.log(regex.test("console"));
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.prompt) ||
        regex.test(item.tag)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("api/prompt");
      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      )
        : (
          <PromptCardList
            data={posts}
            handleTagClick={handleTagClick}
          />
        )}

    </section>
  )
}

export default Feed