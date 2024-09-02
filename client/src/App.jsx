import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import {Toaster} from "react-hot-toast";
import Restaurant from "./pages/Restaurant";
import FilterResult from "./pages/FilterResult";
import SearchResult from "./pages/SearchResult";
import PageNotFound from "./components/shared/PageNotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/restaurant/:id" element = {<Restaurant />} />
        <Route path="/filter-result" element = {<FilterResult />} />
        <Route path="/image-result" element = {<SearchResult />} />
        <Route path="*" element = {<PageNotFound />} />
      </Routes>
      <Toaster position='top-right' />
    </BrowserRouter>
  )
}