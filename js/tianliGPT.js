console.log(
  "\n %c 洪墨摘要AI 博客文章摘要AI生成工具 %c https://ai.zhheo.com/ \n",
  "color: #fadfa3; background: #030307; padding:5px 0;",
  "background: #fadfa3; padding:5px 0;"
);
var tianliGPTIsRunning = !1,
  tianliGPTLastRunTime = 0,
  tianliGPTIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48px" height="48px" viewBox="0 0 48 48">
    <g id="&#x673A;&#x5668;&#x4EBA;" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <path d="M34.717885,5.03561087 C36.12744,5.27055371 37.079755,6.60373651 36.84481,8.0132786 L35.7944,14.3153359 L38.375,14.3153359 C43.138415,14.3153359 47,18.1768855 47,22.9402569 L47,34.4401516 C47,39.203523 43.138415,43.0650727 38.375,43.0650727 L9.625,43.0650727 C4.861585,43.0650727 1,39.203523 1,34.4401516 L1,22.9402569 C1,18.1768855 4.861585,14.3153359 9.625,14.3153359 L12.2056,14.3153359 L11.15519,8.0132786 C10.920245,6.60373651 11.87256,5.27055371 13.282115,5.03561087 C14.69167,4.80066802 16.024865,5.7529743 16.25981,7.16251639 L17.40981,14.0624532 C17.423955,14.1470924 17.43373,14.2315017 17.43948,14.3153359 L30.56052,14.3153359 C30.56627,14.2313867 30.576045,14.1470924 30.59019,14.0624532 L31.74019,7.16251639 C31.975135,5.7529743 33.30833,4.80066802 34.717885,5.03561087 Z M38.375,19.4902885 L9.625,19.4902885 C7.719565,19.4902885 6.175,21.0348394 6.175,22.9402569 L6.175,34.4401516 C6.175,36.3455692 7.719565,37.89012 9.625,37.89012 L38.375,37.89012 C40.280435,37.89012 41.825,36.3455692 41.825,34.4401516 L41.825,22.9402569 C41.825,21.0348394 40.280435,19.4902885 38.375,19.4902885 Z M14.8575,23.802749 C16.28649,23.802749 17.445,24.9612484 17.445,26.3902253 L17.445,28.6902043 C17.445,30.1191812 16.28649,31.2776806 14.8575,31.2776806 C13.42851,31.2776806 12.27,30.1191812 12.27,28.6902043 L12.27,26.3902253 C12.27,24.9612484 13.42851,23.802749 14.8575,23.802749 Z M33.1425,23.802749 C34.57149,23.802749 35.73,24.9612484 35.73,26.3902253 L35.73,28.6902043 C35.73,30.1191812 34.57149,31.2776806 33.1425,31.2776806 C31.71351,31.2776806 30.555,30.1191812 30.555,28.6902043 L30.555,26.3902253 C30.555,24.9612484 31.71351,23.802749 33.1425,23.802749 Z" id="&#x5F62;&#x72B6;&#x7ED3;&#x5408;" fill-rule="nonzero"></path>
    </g>
    </svg>`,
  tianliGPTSystem = "";

let tianliGPT_postSelector = "#postchat_postcontent";
let tianliGPT_key = "S-THOHXOGDEEQTLHFV";
let tianliGPT_injectDom = ".postAI-talk";

class TianliGPT {
  resolveElementFromSelector(e) {
    try {
      if ("@postchat_postcontent" !== e) return document.querySelector(e);
      {
        var i = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_COMMENT,
          null
        );
        let t = null,
          n = null;
        for (; i.nextNode(); ) {
          var r =
            i.currentNode && i.currentNode.data
              ? i.currentNode.data.trim()
              : "";
          if (!t && r.includes("@postchat_postcontent start"))
            t = i.currentNode;
          else if (t && r.includes("@postchat_postcontent end")) {
            n = i.currentNode;
            break;
          }
        }
        if (t && n) {
          if (t.parentNode === n.parentNode ? t.parentNode : null) {
            let e = t.nextSibling;
            for (var a = []; e && e !== n; )
              e.nodeType === Node.ELEMENT_NODE && a.push(e),
                (e = e.nextSibling);
            if (1 === a.length) {
              var o = a[0];
              try {
                o.setAttribute("data-postchat-wrapper", "postcontent");
              } catch (e) {}
              return o;
            }
          }
          var l = document.createRange();
          l.setStartAfter(t), l.setEndBefore(n);
          let e = l.commonAncestorContainer;
          if ((e = e.nodeType !== Node.ELEMENT_NODE ? e.parentElement : e)) {
            try {
              e.setAttribute("data-postchat-wrapper", "postcontent");
            } catch (e) {}
            return e;
          }
        }
        return null;
      }
    } catch (e) {
      return null;
    }
  }
  insertAIDiv(i, e) {
    if ("none" !== e) {
      this.removeExistingAIDiv();
      let n = this.resolveElementFromSelector(i);
      var t,
        r,
        a,
        e = this.resolveElementFromSelector((e = e || i));
      if (!n) {
        let e = 0,
          t = setInterval(() => {
            (e += 300),
              (n = this.resolveElementFromSelector(i))
                ? clearInterval(t)
                : 2e4 <= e &&
                  (clearInterval(t),
                  console.log(
                    "洪墨摘要AI：在网页显示摘要AI框架失败，原因是没有找到需要注入的位置。如果本不打算在此页面展示摘要AI，可以忽略此提醒。"
                  ));
          }, 300);
      }
      tianliGPTIsRunning ||
        ((tianliGPTIsRunning = !0),
        ((t = document.createElement("div")).className = "postAI-lx"),
        "undefined" != typeof tianliGPT_theme &&
          tianliGPT_theme &&
          t.classList.add("gpttheme_" + tianliGPT_theme.toLowerCase()),
        // ((a = document.createElement("div")).className = "tianliGPT-title"),
        // t.appendChild(a),
        // ((r = document.createElement("i")).className = "tianliGPT-title-icon"),
        // a.appendChild(r),
        // (r.innerHTML = tianliGPTIcon),
        // ((r = document.createElement("div")).className =
        //   "tianliGPT-title-text"),
        // "undefined" == typeof tianliGPT_Title
        //   ? (r.textContent = "AI摘要")
        //   : (r.textContent = tianliGPT_Title),
        // a.appendChild(r),
        // ((r = document.createElement("div")).className = "tianliGPT-tag"),
        // (r.id = "tianliGPT-tag"),
        // "undefined" == typeof tianliGPT_Name
        //   ? (r.textContent = "洪墨AI")
        //   : (r.textContent = tianliGPT_Name),
        // a.appendChild(r),
        ((a = document.createElement("div")).className =
          "tianliGPT-explanation"),
        (a.innerHTML =
          "undefined" == typeof tianliGPT_loadingText || tianliGPT_loadingText
            ? '生成中...<span class="blinking-cursor"></span>'
            : '<span class="blinking-cursor"></span>'),
        t.appendChild(a),
        e
          ? e.insertBefore(t, e.firstChild)
          : n && n.insertBefore(t, n.firstChild));
    }
  }
  removeExistingAIDiv() {
    var e = document.querySelector(".postAI-lx");
    e && e.parentElement.removeChild(e);
  }
  getVerifiedTitle() {
    let t = ["#thread_subject", ".view_tit", "h1", ".postlist_top h2"];
    var e = (document.title || "").trim(),
      n = (function () {
        for (var e of t) {
          e = document.querySelector(e);
          if (e && e.textContent.trim())
            return (
              (e = (e = e).cloneNode(!0))
                .querySelectorAll("em")
                .forEach((e) => e.remove()),
              e.textContent.trim()
            );
        }
        return null;
      })();
    return n && e.startsWith(n) ? n.trim() : e;
  }
  getTitleAndContent() {
    try {
      let r = this.getVerifiedTitle(),
        a = () => {
          var t = this.resolveElementFromSelector(tianliGPT_postSelector);
          if (!t) return "";
          var e,
            t = t.cloneNode(!0),
            n =
              (t
                .querySelectorAll(
                  ".showhide, .locked, script, style, .authi, .postAI-lx, .code, .terminal_frame, .share-modal, .aplayer, pre, td"
                )
                .forEach((e) => e.remove()),
              "Discuz" == tianliGPTSystem &&
                t
                  .querySelectorAll(
                    ".txtlist.cl, .view_reply.cl, ignore_js_op, #hm_qrcode, .readthread_box",
                    ".smplayerbox",
                    ".it618_tieclick_ajax",
                    ".attach_nopermission"
                  )
                  .forEach((e) => e.remove()),
              t.querySelectorAll("p, strong, font, ul, li, ol, span, td"));
          let i = "";
          for (e of t.querySelectorAll("h1, h2, h3, h4, h5"))
            i += e.innerText + " ";
          var r,
            a = [];
          for (r of n) {
            var o = Array.from(r.childNodes)
              .filter((e) => e.nodeType === Node.TEXT_NODE)
              .map((e) => e.textContent)
              .join("")
              .trim()
              .replace(/https?:\/\/[^\s]+/g, "");
            "" !== o.trim() && a.push(o);
          }
          if (0 === a.length) {
            let e = t.innerText;
            (e = e.replace(/\n/g, " ").replace(/\s+/g, " ").trim()), (i += e);
          } else i = a.join(" ");
          return i.trim();
        },
        o = a();
      if (!o)
        return new Promise((n) => {
          let e = 0,
            i = () => {
              e++,
                console.log(`洪墨摘要AI：文章内容为空，第${e}次重试...`),
                setTimeout(() => {
                  if (!(o = a()) && e < 2) i();
                  else if (o) {
                    let e = r + " " + o;
                    e = (e = e.replace(/(\s*\n\s*)+/g, " ").trim()).replace(
                      /[\uFE00-\uFE0F]|\u{E0100}-\u{E01EF}/gu,
                      ""
                    );
                    var t =
                      "undefined" != typeof tianliGPT_wordLimit
                        ? tianliGPT_wordLimit
                        : 1e3;
                    n(e.slice(0, t));
                  } else
                    console.log(
                      "洪墨摘要AI：重试3次后内容仍为空，放弃获取。如果本不打算在此页面展示摘要AI，可以忽略此提醒。"
                    ),
                      n("");
                }, 1e3);
            };
          i();
        });
      let e = r + " " + o;
      e = (e = e.replace(/(\s*\n\s*)+/g, " ").trim()).replace(
        /[\uFE00-\uFE0F]|\u{E0100}-\u{E01EF}/gu,
        ""
      );
      var t =
        "undefined" != typeof tianliGPT_wordLimit ? tianliGPT_wordLimit : 1e3;
      return e.slice(0, t);
    } catch (e) {
      return (
        console.log(
          "洪墨摘要AI：可能由于一个或多个情况在本页面没有正常运行，如果本不打算在此页面展示，可以忽略此提醒，原因出在获取文章容器中的内容失败，或者可能是在文章转换过程中失败。",
          e
        ),
        ""
      );
    }
  }
  old_getTitleAndContent() {
    try {
      var n,
        i,
        r = document.title,
        a = document.querySelector(tianliGPT_postSelector),
        o =
          (a ||
            (console.log("洪墨摘要AI：找不到文章容器。将在2秒后重新检查。"),
            setTimeout(() => {
              document.querySelector(tianliGPT_postSelector)
                ? ((tianliGPTIsRunning = !1), this.checkURLAndRun())
                : console.log(
                    "洪墨摘要AI：再次检查后仍找不到文章容器。如果本页面不打算展示摘要，可以忽略此提醒。请确保代码放置在正确的位置。"
                  );
            }, 500)),
          a.getElementsByTagName("p")),
        l = a.querySelectorAll("h1, h2, h3, h4, h5");
      let e = "";
      for (n of l) e += n.innerText + " ";
      for (i of o) {
        var s = i.innerText.replace(/https?:\/\/[^\s]+/g, "");
        e += s;
      }
      var c = r + " " + e;
      let t = 1e3;
      return (
        "undefined" != typeof tianliGPT_wordLimit && (t = tianliGPT_wordLimit),
        c.slice(0, t)
      );
    } catch (e) {
      return (
        console.log(
          "洪墨摘要AI：可能由于一个或多个情况在本页面没有正常运行，如果本不打算在此页面展示，可以忽略此提醒，原因出在获取文章容器中的内容失败，或者可能是在文章转换过程中失败。",
          e
        ),
        ""
      );
    }
  }
  async fetchTianliGPT(s) {
    if ("undefined" != typeof tianliGPT_summary && tianliGPT_summary)
      return {
        summary: tianliGPT_summary,
      };
    let c = "";
    var e = document.querySelector("script[data-postChat_key]");
    if (e) c = e.getAttribute("data-postChat_key");
    else {
      if ("undefined" == typeof tianliGPT_key)
        return {
          summary:
            "没有获取到key，代码可能没有安装正确。如果你需要在tianli_gpt文件引用前定义tianliGPT_key变量。详细请查看文档。",
        };
      c = tianliGPT_key;
    }
    if ("5Q5mpqRK5DkwT1X9Gi5e" === c)
      return {
        summary: "请购买 key 使用，如果你能看到此条内容，则说明代码安装正确。",
      };
    var u = window.location.href,
      e = (u = u.split("#")[0]).toLowerCase().indexOf(".html");
    -1 !== e && (u = u.substring(0, e + 5));
    try {
      var t = new URL(u).hostname;
      if ("localhost" === t || "127.0.0.1" === t)
        return {
          summary: "为了确保使用安全，暂不支持局域网请求摘要",
        };
      var n = t.split(".");
      if (4 === n.length) {
        var i = parseInt(n[0]),
          r = parseInt(n[1]);
        if (
          10 === i ||
          (172 === i && 16 <= r && r <= 31) ||
          (192 === i && 168 === r)
        )
          return {
            summary: "为了确保使用安全，暂不支持局域网请求摘要",
          };
      }
    } catch (e) {
      console.warn("URL解析失败，继续执行:", e);
    }
    let d = document.title;
    if ("Discuz" === tianliGPTSystem) {
      (e = new URL(u)),
        (t =
          "undefined" != typeof tianliGPT_discuz_tid
            ? tianliGPT_discuz_tid
            : "undefined" != typeof tid
            ? tid
            : null);
      if (!t)
        return {
          summary:
            "Discuz中需要携带tid参数，变量名为：tianliGPT_discuz_tid，例如：let tianliGPT_discuz_tid = '2'，当tid不存在的页面可以设为0。不允许不包含tid参数的Discuz请求。建议使用Discuz插件实现。",
        };
      u = e.origin + "/forum.php?mod=viewthread&tid=" + t;
    }
    if ("ZBlog" === tianliGPTSystem) {
      (n = new URL(u)),
        (i =
          "undefined" != typeof tianliGPT_zblog_id ? tianliGPT_zblog_id : null);
      if (!i)
        return {
          summary:
            "ZBlog中需要携带id参数，变量名为：tianliGPT_zblog_id，例如：let tianliGPT_zblog_id = '3'。不允许不包含id参数的ZBlog请求。",
        };
      u = n.origin + "/?id=" + i;
    }
    let m = "zh-CN";
    async function p(e = 0) {
      let t = new AbortController();
      var n = setTimeout(() => t.abort(), 1e4);
      try {
        var i,
          r = await fetch("https://api.ai.zhheo.com/api/v2/summary/get", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: u,
              system: tianliGPTSystem,
            }),
            signal: t.signal,
          }),
          a = await r.json();
        if (1404 === a.code) {
          var o = await fetch(
              "https://api.ai.zhheo.com/api/v2/summary/generate/external",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  content: s,
                  key: c,
                  url: u,
                  title: d,
                  system: tianliGPTSystem,
                  language: m,
                }),
                signal: t.signal,
                referrer: location.href,
                referrerPolicy: "origin",
              }
            ),
            l = (clearTimeout(n), await o.json());
          if (l.err_code) return T(l);
          if (o.ok && 200 === l.code)
            return {
              summary: l.data.summary,
            };
          if (!o.ok || 200 !== l.code)
            return {
              summary: l.msg || "生成摘要失败",
            };
          if (409 === o.status && e < 2)
            return await new Promise((e) => setTimeout(e, 5e3)), p(e + 1);
          if (409 === o.status)
            return {
              summary: "生成摘要失败，请稍后再试。",
            };
        }
        return a.err_code
          ? T(a)
          : r.ok && 200 === a.code
          ? (clearTimeout(n),
            {
              summary: a.data.summary,
            })
          : 514 === r.status
          ? ((i =
              "TianliGPT is only available in mainland China, and is not yet open to overseas users, so stay tuned!"),
            this.aiShowAnimation(i),
            {
              summary: i,
            })
          : void 0;
      } catch (e) {
        return (
          clearTimeout(n),
          "AbortError" === e.name
            ? (console.warn("请求超时"),
              {
                summary: "请求超时",
              })
            : (console.error("请求失败：", e),
              {
                summary: "请求失败",
              })
        );
      }
    }

    function T(e) {
      let t;
      switch (e.err_code) {
        case 1:
          return {
            summary: (t =
              '你的网站设置了Referrer-Policy为same-origin，这会导致Tianli无法验证你的请求来源。TianliGPT依赖refer进行来源判断，特别是meta标签的referrer属性需要修改，至少为origin。例如：<meta name="referrer" content="origin">'),
          };
        case 2:
          return {
            summary: (t =
              "你正在使用的账户Key或tianliGPT_key没有绑定当前网站，请检查当前的密钥是否绑定了当前网站地址。可以到summary.zhheo.com中绑定。"),
          };
        case 3:
          return {
            summary: (t = "参数缺失，请检查是否正确配置账户Key或tianliGPT_key"),
          };
        case 4:
          throw (
            (document.querySelectorAll(".postAI-lx").forEach((e) => {
              e.style.display = "none";
            }),
            (t = "Key错误或余额不足，请充值后请求新的文章"),
            new Error("洪墨摘要AI：" + t))
          );
        case 5:
          return (
            document.querySelectorAll(".postAI-lx").forEach((e) => {
              e.style.display = "none";
            }),
            {
              summary: (t = "未知错误"),
            }
          );
        case 6:
          return (
            document.querySelectorAll(".postAI-lx").forEach((e) => {
              e.style.display = "none";
            }),
            {
              summary: (t = "数据库错误"),
            }
          );
        case 7:
          return (
            (t = e.msg || "系统错误，请稍后再试"),
            {
              summary: (t =
                e.msg && e.msg.includes("L10500")
                  ? "这篇文章包含时政或敏感内容，可以直接查看原文哦，本文的摘要功能已关闭。"
                  : t),
            }
          );
        default:
          return {
            summary: "未知错误，请检查API文档",
          };
      }
    }
    document.documentElement.lang && (m = document.documentElement.lang);
    r = await p();
    return "timeout" === r
      ? (console.warn("第一次请求超时，尝试第二次请求..."),
        "timeout" === (e = await p()) || "error" === e
          ? {
              summary: "目前生成摘要任务排队较多，请稍候刷新再试",
            }
          : e)
      : r;
  }
  aiShowAnimation(e) {
    let i = document.querySelector(".tianliGPT-explanation");
    if (!i) return;
    let r = e,
      t;
    if (
      ("undefined" != typeof tianliGPT_BeginningText
        ? (t = tianliGPT_BeginningText)
        : "undefined" != typeof postChatConfig && postChatConfig.beginningText
        ? (t = postChatConfig.beginningText)
        : "Discuz" === tianliGPTSystem && (t = "这个帖子"),
      t &&
        (r.match(/^这篇文章[\u4e00-\u9fa5]{1,2}了/)
          ? (r = r.replace(/^这篇文章[\u4e00-\u9fa5]{1,2}了/g, "" + t))
          : r.match(/^这篇文章通过/) &&
            (r = r.replace(/^这篇文章通过/g, t + "通过"))),
      (r = r.replace(/介绍了通过/g, "通过")),
      "undefined" != typeof tianliGPT_typingAnimate && !tianliGPT_typingAnimate)
    )
      return (i.innerHTML = r), void (tianliGPTIsRunning = !1);
    // (i.style.display = "block"),
    //   (i.innerHTML =
    //     "undefined" == typeof tianliGPT_loadingText || tianliGPT_loadingText
    //       ? '生成中...<span class="blinking-cursor"></span>'
    //       : '<span class="blinking-cursor"></span>'),
    //   document.querySelector(".tianliGPT-tag").classList.add("loadingAI");
    let a,
      o = 0,
      l = performance.now(),
      s = () => {
        var e, t, n;
        o < r.length &&
          a &&
          ((t = (e = performance.now()) - l),
          (n = r.slice(o, o + 1)),
          (/[，。！、？,.!?]/.test(n) ? 150 : 25) <= t &&
            ((i.innerText = r.slice(0, o + 1)),
            (l = e),
            ++o < r.length
              ? (i.innerHTML =
                  r.slice(0, o) + '<span class="blinking-cursor"></span>')
              : ((i.innerHTML = r),
                (i.style.display = "block"),
                (tianliGPTIsRunning = !1),
                c.disconnect(),
                document
                  .querySelector(".tianliGPT-tag")
                  .classList.remove("loadingAI"))),
          requestAnimationFrame(s));
      },
      c = new IntersectionObserver(
        (e) => {
          e = e[0].isIntersecting;
          (a = e) &&
            setTimeout(() => {
              requestAnimationFrame(s);
            }, 200);
        },
        {
          threshold: 0,
        }
      );
    e = document.querySelector(".postAI-lx");
    c.observe(e);
  }
  async runTianliGPT() {
    if ("undefined" != typeof tianliGPT_postSelector) {
      if ("Discuz" === tianliGPTSystem) {
        var e = this.resolveElementFromSelector(tianliGPT_postSelector);
        if (e)
          if (
            e.querySelector(
              'a[href*="plugin.php?id=duceapp_vip&ac=pay&referer=forum.php"]'
            )
          )
            return;
      }
      this.insertAIDiv(
        tianliGPT_postSelector,
        "undefined" != typeof tianliGPT_injectDom && tianliGPT_injectDom
          ? tianliGPT_injectDom
          : tianliGPT_postSelector
      ),
        "undefined" != typeof tianliGPT_summary && tianliGPT_summary
          ? this.aiShowAnimation(tianliGPT_summary)
          : "https:" !== window.location.protocol
          ? this.aiShowAnimation(
              "为了保证传输的安全性和可靠性，不支持在http协议下显示文章摘要。请为网站申请证书，并在summary.zhheo.com使用https协议的地址绑定即可。如果是本地或者局域网访问，可以忽略此警告。"
            )
          : ((e = await this.getTitleAndContent()) &&
              console.log("TianliGPT本次提交的内容为：" + e),
            this.fetchTianliGPT(e).then((e) => {
              e = e.summary;
              this.aiShowAnimation(e);
            }));
    }
  }
  checkURLAndRun() {
    var e = Date.now();
    if (!(e - tianliGPTLastRunTime < 500)) {
      tianliGPTLastRunTime = e;
      e = document.querySelector('meta[name="generator"]');
      if (e && e.content.includes("WordPress")) {
        e = new URL(window.location.href);
        if (
          e.searchParams.has("preview") &&
          "true" === e.searchParams.get("preview")
        )
          return void console.log(
            "当前页面为WordPress预览模式，不执行摘要功能。"
          );
      }
      if ("undefined" == typeof tianliGPT_postURL) this.attemptRunTianliGPT();
      else
        try {
          let e;
          e = ((e) => {
            try {
              return (
                new RegExp(e),
                e.startsWith("/") && e.endsWith("/") && 2 < e.length
              );
            } catch (e) {
              return !1;
            }
          })(tianliGPT_postURL)
            ? new RegExp(tianliGPT_postURL.slice(1, -1))
            : ((e) => {
                e = e.replace(/[|\\{}()[\]^$+?.]/g, "\\$&");
                return new RegExp("^" + e.split(/\*+/).join(".*") + "$");
              })(tianliGPT_postURL);
          var t = window.location.href;
          e.test(t)
            ? this.attemptRunTianliGPT()
            : console.log(
                `洪墨摘要AI：当前 URL '${t}' 不符合规则 '${tianliGPT_postURL}'，所以我决定不执行摘要功能。`
              );
        } catch (e) {
          console.error(
            "洪墨摘要AI：我没有看懂你编写的自定义链接规则，所以我决定不执行摘要功能",
            e
          );
        }
    }
  }
  attemptRunTianliGPT() {
    let t = 0,
      n = setInterval(() => {
        try {
          this.tianliGPTCustomBlackList(), clearInterval(n);
        } catch (e) {
          20 <= t &&
            (clearInterval(n),
            console.error(
              "洪墨摘要AI：获取自定义黑名单超时。多次尝试失败，停止尝试。",
              e
            )),
            t++;
        }
      }, 200);
  }
  tianliGPTCustomBlackList() {
    "undefined" != typeof tianliGPT_blacklist && tianliGPT_blacklist
      ? fetch(tianliGPT_blacklist)
          .then((e) => e.json())
          .then((e) => {
            e = e.blackurls;
            let t = window.location.href;
            e.some((e) => {
              return new RegExp("^" + e.replace(/\*/g, ".*") + "$").test(t);
            })
              ? console.log("洪墨摘要AI：URL在黑名单中，不执行摘要")
              : this.runTianliGPT();
          })
          .catch((e) => {
            console.error(
              "洪墨摘要AI：请求黑名单失败。Error fetching blacklist:",
              e
            ),
              this.runTianliGPT();
          })
      : this.runTianliGPT();
  }
}

function postchat_checkSystemType() {
  var e;
  "undefined" != typeof postChatConfig && postChatConfig.systemType
    ? (tianliGPTSystem = postChatConfig.systemType)
    : (e = document.querySelector('meta[name="generator"]')) &&
      e.content.includes("Discuz") &&
      (tianliGPTSystem = "Discuz");
}
postchat_checkSystemType(),
  window.tianliGPT || (window.tianliGPT = new TianliGPT()),
  document.addEventListener("DOMContentLoaded", function () {
    postchat_checkSystemType(), window.tianliGPT.checkURLAndRun();
  }),
  document.addEventListener("pjax:complete", function () {
    postchat_checkSystemType(), window.tianliGPT.checkURLAndRun();
  }),
  document.addEventListener("pjax:success", function () {
    tianliGPTIsRunning = !1;
  }),
  window.addEventListener("popstate", function () {
    postchat_checkSystemType(), window.tianliGPT.checkURLAndRun();
  }),
  window.addEventListener("hashchange", function () {
    postchat_checkSystemType(), window.tianliGPT.checkURLAndRun();
  }),
  (function (n) {
    var e = n.pushState;
    n.pushState = function (t) {
      if ("function" == typeof n.onpushstate)
        if ("undefined" != typeof pjaxLoading) {
          let e = () => {
            pjaxLoading
              ? setTimeout(e, 50)
              : n.onpushstate({
                  state: t,
                });
          };
          e();
        } else
          setTimeout(function () {
            n.onpushstate({
              state: t,
            });
          }, 200);
      return e.apply(n, arguments);
    };
  })(window.history),
  (window.history.onpushstate = function (e) {
    postchat_checkSystemType(), window.tianliGPT.checkURLAndRun();
  });
