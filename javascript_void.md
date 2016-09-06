##防止點了'#'連結後跳回到頁面頂端

實作上常常用一些假連結來觸發一些事件,但是如果沒有特別做什麼處理的話,按一次畫面就會跳回頁面頂端一次,幾種方法可以解決這個問題

這兩種基本上只是完整和省略的寫法,實際上是一樣的

    link_to('Click me', 'javascript:;')
    link_to('Click me', 'javascript:void(0)')
    
   
  或是直接在javascript裡面加**return false** / **event.preventDefault()**

> Written with [StackEdit](https://stackedit.io/).
