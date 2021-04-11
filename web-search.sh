# https://www.amazon.com/s?i=toys-and-games&ref=nb_sb_noss_1&k=something
# https://boardgameco.com/pages/search-results-page?page=1&rb_snize_facet1=In+Stock&q=something
# https://www.coolstuffinc.com/main_search.php?pa=searchOnName&page=1&resultsPerPage=25&q=something
# https://www.gamenerdz.com/search.php?section=product&_bc_fsnf=1&in_stock=1&search_query=something
# https://www.miniaturemarket.com/searchresults/?q=something
# https://www.miniaturemarket.com/searchresults/?filter[]=stock_status_uFilter:%22In%20Stock%22&q=something
# https://www.nobleknight.com/Search?SortBy=searchresults&pS=&plS=&SSL=In+Stock&MinP=&MaxP=&text=something

export AMZN="https://www.amazon.com/s?i=toys-and-games&ref=nb_sb_noss_1&k="
export BGC="https://boardgameco.com/pages/search-results-page?page=1&rb_snize_facet1=In+Stock&q="
export CSI="https://www.coolstuffinc.com/main_search.php?pa=searchOnName&page=1&resultsPerPage=25&q="
export GN="https://www.gamenerdz.com/search.php?section=product&_bc_fsnf=1&in_stock=1&search_query="
export MM="https://www.miniaturemarket.com/searchresults/?filter[]=stock_status_uFilter:%22In%20Stock%22&q="
export NK="https://www.nobleknight.com/Search?SortBy=searchresults&pS=&plS=&SSL=In+Stock&MinP=&MaxP=&text="

open ${AMZN}"${1}"
open ${BGC}"${1}"
open ${CSI}"${1}"
open ${GN}"${1}"
open ${MM}"${1}"
open ${NK}"${1}"
