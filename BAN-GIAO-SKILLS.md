# Biên bản bàn giao · Hai bộ kỹ năng thiết kế (Impeccable + Taste Skill)

**Ngày:** 26/07/2026
**Người thực hiện:** Claude
**Phạm vi:** chỉ cài công cụ. **Không một dòng nào của website bị thay đổi.**
**Trạng thái:** đã cài, đã chạy thử, đã đẩy lên GitHub. Còn 3 việc cần anh quyết định (mục 7).

---

## 1. Tóm tắt trong 30 giây

Anh vừa được cài thêm hai "bộ não phụ về thiết kế" cho Claude, lấy từ hai dự án mã nguồn mở
trên GitHub:

| Tên | Nguồn | Nó làm gì |
|---|---|---|
| **Impeccable** | github.com/pbakaus/impeccable | Bộ 23 lệnh thiết kế. Anh gõ một từ, Claude biết chính xác phải làm gì. Ví dụ `/impeccable audit` = soát lỗi kỹ thuật cả trang. |
| **Taste Skill** | github.com/Leonxlnx/taste-skill | Một tài liệu hướng dẫn Claude tránh làm ra giao diện "nhìn như template". Tự động chạy, không cần gõ lệnh. |

Nói ngắn gọn: trước đây khi anh bảo "làm trang này đẹp hơn", Claude tự đoán "đẹp" là gì. Bây giờ
nó có một bộ tiêu chuẩn và một bộ từ vựng chung với anh.

---

## 2. Cơ chế · "Skill" là cái gì và nó hoạt động ra sao

Phần này giải thích từ số 0, anh không cần biết gì trước.

### 2.1 Skill là một thư mục chứa file hướng dẫn

Một "skill" (kỹ năng) **không phải là phần mềm**. Nó không cài đặt vào máy, không chạy nền,
không tốn RAM. Nó chỉ là **một thư mục chứa một file văn bản tên `SKILL.md`**, bên trong viết
sẵn hướng dẫn cho Claude, kiểu như: "khi người dùng nhờ chỉnh giao diện, hãy làm theo các bước
sau, tránh các lỗi sau, dùng các nguyên tắc sau".

Anh có thể mở `SKILL.md` bằng Notepad hay TextEdit và đọc được toàn bộ. Không có gì bí ẩn.

### 2.2 Claude nạp file đó khi nào

Claude **không đọc tất cả skill mọi lúc**. Nó chỉ đọc phần mô tả ngắn (1 đoạn) của từng skill.
Khi anh nhắn một câu, nó so câu đó với các mô tả:

- Anh viết *"sửa cái form liên hệ cho gọn lại"* → khớp với mô tả của skill thiết kế → Claude
  mở `SKILL.md` ra đọc đầy đủ rồi mới bắt tay làm.
- Anh viết *"giá căn 2 phòng ngủ ở AURA bao nhiêu"* → không liên quan thiết kế → Claude bỏ qua,
  không tốn gì.

Đây là lý do việc cài thêm skill **không làm chậm** hay làm nhiễu các việc khác.

### 2.3 Hai skill này kích hoạt theo hai kiểu khác nhau

**Impeccable · gõ tay.** Anh chủ động gọi bằng dấu gạch chéo:

```
/impeccable audit projects
```

Nghĩa là: chạy lệnh `audit` (soát lỗi) trên trang `projects`. Cấu trúc luôn là
`/impeccable <tên lệnh> <trang cần làm>`.

**Taste Skill · tự động.** Anh không gõ gì cả. Cứ nhờ Claude làm giao diện bình thường, nó tự
nhận ra và tự áp dụng.

### 2.4 Vì sao phải cài vào thư mục dự án

Claude trên web chạy trong một máy ảo tạm, dùng xong là xoá. Muốn skill còn đó cho các lần sau,
nó phải nằm **bên trong repo** và được lưu lên GitHub. Đó là lý do có mục 3 dưới đây.

---

## 3. Vị trí · Mọi thứ nằm ở đâu

### 3.1 Trong repo

```
Rivera-Website/
├── .claude/
│   └── skills/
│       ├── impeccable/              ← 129 file, khoảng 3 MB
│       │   ├── SKILL.md             ← file hướng dẫn chính
│       │   ├── reference/           ← 38 file, mỗi lệnh một file chi tiết
│       │   └── scripts/             ← 88 file, phần kiểm tra tự động
│       └── design-taste-frontend/
│           └── SKILL.md             ← 92 KB, chỉ một file duy nhất
└── skills-lock.json                 ← ghi nhớ đã cài từ nguồn nào, để cập nhật sau
```

> **Lưu ý về thư mục ẩn.** `.claude` bắt đầu bằng dấu chấm nên macOS giấu đi trong Finder.
> Muốn thấy: mở thư mục `Rivera-Website`, bấm **Cmd + Shift + dấu chấm**. Bấm lại để ẩn.
> Anh không cần mở nó để dùng. Chỉ để biết nó có thật.

### 3.2 Trên GitHub · và một cảnh báo quan trọng

Toàn bộ đã được đẩy lên GitHub, nhưng **nằm ở một nhánh riêng**, chưa phải nhánh chính:

- Nhánh: `claude/github-install-skills-l8vtac`
- Commit: `25dcade`

**Nghĩa là gì:** thư mục `~/Desktop/Rivera-Website` trên máy Mac của anh **hiện chưa có** hai
skill này. Chúng đang nằm chờ trên GitHub.

**Cần làm gì:** nhánh này phải được gộp (merge) vào nhánh `main`, sau đó kéo về máy. Anh không
phải tự làm. Chỉ cần nhắn trong phiên chat tới: *"gộp nhánh skill vào main và kéo về máy giúp
anh"*, Claude sẽ làm trọn gói.

Chừng nào chưa gộp, hai skill chỉ dùng được trong các phiên Claude trên web mở đúng nhánh đó.

### 3.3 Một file cố tình KHÔNG được lưu

Impeccable có tạo thêm `.claude/settings.local.json`. File này bật một chế độ **tự động soát
lỗi thiết kế sau mỗi lần sửa file**. Tôi **cố tình không đưa nó lên GitHub**, vì nó khiến máy
chạy một đoạn kiểm tra sau *mỗi* thao tác ghi file, kể cả khi anh chỉ sửa một dấu phẩy. Đó là
thứ anh nên tự chọn bật, không nên bị mặc định. Xem mục 7.

---

## 4. Hướng dẫn sử dụng

### 4.1 Gõ lệnh ở đâu

Ngay trong ô chat với Claude, chỗ anh vẫn gõ tin nhắn bình thường. Gõ dấu `/` rồi tên lệnh.
Không cần mở Terminal, không cần cài gì trên máy.

### 4.2 Ba cách dùng, từ dễ đến chi tiết

**Cách 1 · Không cần nhớ gì.** Cứ nhắn bằng tiếng Việt như xưa nay:

> *"trang insights nhìn rời rạc quá, gom lại cho gọn"*

Claude tự nhận ra là việc thiết kế và tự dùng skill. Đây là cách tôi khuyên anh dùng hằng ngày.

**Cách 2 · Gọi lệnh cụ thể** khi anh biết chính xác mình muốn gì:

```
/impeccable critique aura-melbourne-square
```

**Cách 3 · Nói tự do sau tên skill**, khi việc không khớp lệnh nào:

```
/impeccable làm lại phần hero của trang chủ, giữ nguyên video
```

### 4.3 Bảng 23 lệnh của Impeccable

Nhóm theo mục đích. Cột giữa là chữ anh gõ.

**Chuẩn bị · chạy một lần cho cả dự án**

| Việc | Lệnh | Ý nghĩa |
|---|---|---|
| Khai báo bối cảnh | `init` | Phỏng vấn anh vài vòng rồi ghi ra file mô tả sản phẩm và hệ thống thiết kế. Mọi lệnh sau đều đọc file này. |
| Ghi lại thiết kế hiện có | `document` | Đọc ngược code hiện tại rồi viết ra bản mô tả màu, chữ, khoảng cách. |
| Dọn cho nhất quán | `extract` | Tìm các đoạn lặp rải rác rồi gom về một hệ thống chung. |

**Xem xét và đánh giá**

| Việc | Lệnh | Ý nghĩa |
|---|---|---|
| Lên phương án trước khi code | `shape` | Nghĩ bố cục và luồng trước, chưa đụng code. |
| Đánh giá trải nghiệm | `critique` | Soi thứ bậc thông tin, độ rõ ràng, cảm xúc người xem. |
| Soát lỗi kỹ thuật | `audit` | Khả năng tiếp cận, tốc độ tải, hiển thị trên điện thoại. |
| Hoàn thiện trước khi lên sóng | `polish` | Rà lần cuối, đồng bộ với hệ thống thiết kế. |

**Chỉnh sức nặng thị giác**

| Việc | Lệnh | Ý nghĩa |
|---|---|---|
| Mạnh hơn | `bolder` | Trang đang nhạt nhoà, cần dứt khoát hơn. |
| Nhẹ hơn | `quieter` | Trang đang ồn ào, cần trầm lại. **Đây là lệnh hợp với Rivera nhất.** |
| Rút về cốt lõi | `distill` | Bỏ hết thứ không cần thiết. |
| Sửa chữ | `typeset` | Chọn font, cỡ chữ, thứ bậc tiêu đề. |
| Sửa bố cục | `layout` | Khoảng cách, canh lề, nhịp thị giác. |
| Thêm màu | `colorize` | Đưa màu vào một cách có chủ đích. |
| Thêm chuyển động | `animate` | Hiệu ứng có mục đích, không loè loẹt. |
| Thêm điểm thú vị | `delight` | Chi tiết nhỏ gây thiện cảm. |
| Hiệu ứng cao cấp | `overdrive` | Kỹ xảo phức tạp. **Không hợp với Rivera.** |

**Làm cho chắc chắn**

| Việc | Lệnh | Ý nghĩa |
|---|---|---|
| Chịu được tình huống xấu | `harden` | Báo lỗi, tràn chữ, đa ngôn ngữ, trường hợp biên. |
| Người dùng lần đầu | `onboard` | Màn hình trống, luồng vào lần đầu. |
| Sửa câu chữ khó hiểu | `clarify` | Viết lại chữ trên giao diện cho dễ hiểu. |
| Chỉnh theo thiết bị | `adapt` | Điện thoại, máy tính bảng, màn lớn. |
| Tăng tốc | `optimize` | Giảm thời gian tải. |

**Nâng cao**

| Việc | Lệnh | Ý nghĩa |
|---|---|---|
| Chỉnh trực tiếp trên trình duyệt | `live` | Chọn phần tử ngay trên trang, thử nhiều phương án. Cần mở trang trong trình duyệt. |
| Lệnh cũ | `craft` | Đã bỏ, giữ lại cho tương thích. Không cần dùng. |

Tạo lối tắt: `/impeccable pin audit` sẽ tạo ra lệnh gọn hơn là `/audit`.

### 4.4 Dùng Taste Skill

Không có lệnh. Nó tự chạy khi anh nhờ làm giao diện. Nếu muốn ép nó chạy, gõ:

```
/design-taste-frontend
```

Nó mạnh nhất ở **trang giới thiệu, trang bán hàng, portfolio, và làm lại trang từ đầu**. Nó
không dành cho bảng dữ liệu hay giao diện nhiều bước.

---

## 5. Bốn ý tưởng dùng ngay, cụ thể cho Rivera

Không phải ví dụ chung chung. Đây là bốn việc thật, đang có giá trị với site hiện tại.

### Ý tưởng 1 · Soát tràn chữ song ngữ · giá trị cao nhất

```
/impeccable harden
```

Đây là điểm yếu có thật của site: **tiếng Việt dài hơn tiếng Anh trung bình 25 tới 30%**. Mọi
nút bấm, mọi nhãn, mọi tiêu đề đều phải vừa ở cả hai ngôn ngữ. Chỉ cần một nút bị vỡ dòng ở
bản tiếng Việt trên điện thoại là mất vẻ chỉn chu.

Lệnh `harden` được thiết kế đúng cho việc này: tràn chữ, đa ngôn ngữ, trường hợp biên. Vì tiếng
Việt là ngôn ngữ mặc định của site, đây là thứ khách nhìn thấy đầu tiên.

Nên chạy trên: `index.html`, `projects.html`, `enquire.html`.

### Ý tưởng 2 · Kiểm tra sức khoẻ toàn site trước mùa cao điểm

```
/impeccable audit projects
/impeccable audit index
```

`audit` chạy **60 luật kiểm tra máy móc**, không phải ý kiến chủ quan: ảnh thiếu mô tả cho người
khiếm thị, độ tương phản chữ chưa đạt, ảnh nặng làm chậm trang, bố cục vỡ ở màn hẹp.

Đây là loại lỗi không ai để ý cho tới khi một khách hàng cao cấp mở site trên iPhone ở chỗ sóng
yếu. Chạy mỗi quý một lần là đủ.

### Ý tưởng 3 · Nhờ đánh giá thẳng thắn trang chủ lực

```
/impeccable critique aura-melbourne-square
```

AURA là trang cờ đầu, làm công phu nhất. Nhưng làm lâu thì quen mắt, mất khả năng nhìn ra vấn
đề. `critique` là một lượt đánh giá trải nghiệm: thứ bậc thông tin có đúng không, người xem có
biết bước tiếp theo là gì không, cảm xúc trang tạo ra có đúng "quiet luxury" không.

Nó **chỉ nhận xét, không tự sửa**. Anh đọc rồi quyết định làm gì.

### Ý tưởng 4 · Làm trang dự án thứ 8 nhanh và chắc hơn

Khi có dự án mới, thay vì nhờ chung chung, đi theo trình tự:

```
1. /impeccable shape     → lên bố cục và luồng trước, chưa code
2. (Claude dựng trang theo Aura-design.md)
3. /impeccable critique  → tự soi lại
4. /impeccable harden    → soát song ngữ, tràn chữ
5. /impeccable polish    → rà lần cuối trước khi lên sóng
```

Trình tự này biến việc "làm trang mới" từ một cú nhờ vả mơ hồ thành năm bước có thể kiểm tra
từng bước. Anh xem được kết quả ở mỗi chặng thay vì chỉ thấy kết quả cuối.

---

## 6. Giới hạn và rủi ro · phải đọc

**6.1 Hai skill này là hàng phổ thông, không hiểu Rivera.**
Chúng được viết cho giao diện SaaS và startup nói chung, thiên về **táo bạo, tương phản mạnh,
chuyển động nhiều**. Rivera đi hướng ngược lại: trầm, ít, chậm rãi.

**Quy tắc xử lý xung đột:** khi skill gợi ý điều gì trái với `Aura-design.md` hoặc hệ màu Rivera
thì **Rivera thắng**. Tôi đã ghi điều này vào `CHANGELOG.md` để các phiên Claude sau đều thấy.
Nếu Claude nào đó đề xuất gradient tím hay font Inter, đó là skill đang lấn, cứ bác bỏ.

**6.2 Lệnh `overdrive` và `bolder` gần như không bao giờ hợp với Rivera.** Chúng có trong bộ
lệnh vì bộ lệnh là hàng chung. Anh cứ bỏ qua chúng.

**6.3 Kích thước.** Repo nặng thêm khoảng 3 MB. Không ảnh hưởng tốc độ site vì thư mục `.claude`
không được đưa lên Vercel, khách truy cập không bao giờ tải nó.

**6.4 Về cách cài.** Bộ cài chính thức của Impeccable tải file từ `impeccable.style`, nhưng máy
chủ đang chạy chặn tên miền đó (lỗi HTTP 403). Tôi đã tải mã nguồn gốc từ GitHub về, tự dựng
bản phân phối bằng công cụ chính thức của chính dự án đó, rồi cài từ bản vừa dựng. Kết quả giống
hệt bản cài chuẩn. Đã kiểm tra bằng công cụ tự chẩn đoán của Impeccable, báo *"No drift found"*,
nghĩa là không lệch file nào.

---

## 7. Ba việc cần anh quyết định

**7.1 Gộp nhánh vào `main`.** Bắt buộc, nếu không thì máy Mac của anh không có gì cả.
→ Nhắn: *"gộp nhánh skill vào main giúp anh"*.

**7.2 Có bật chế độ tự soát lỗi không?**
Impeccable có thể tự chạy kiểm tra sau mỗi lần sửa file. Lợi: bắt lỗi ngay lập tức. Hại: chậm
hơn một chút ở *mọi* thao tác, kể cả sửa một chữ trong `CHANGELOG.md`. Hiện đang **tắt** ở
trạng thái lưu trữ.
→ Muốn bật, nhắn: *"bật hook của impeccable"*.

**7.3 Có chạy `/impeccable init` không?**
Lệnh này phỏng vấn anh rồi ghi ra hai file mới ở gốc dự án: `PRODUCT.md` và `DESIGN.md`. Vấn đề:
Rivera **đã có** `Aura-design.md` làm nguồn chân lý về thiết kế. Chạy `init` sẽ tạo ra file thứ
hai nói cùng một chuyện, và hai file mâu thuẫn nhau là mầm mống rắc rối về sau.

Tôi **khuyên chưa chạy**. Thay vào đó, khi cần, nhờ Claude cho Impeccable đọc thẳng
`Aura-design.md`. Nếu anh muốn chạy, hãy quyết định trước file nào là chính.

---

## 8. Bảo trì

**Cập nhật lên bản mới:**
> *"cập nhật skill impeccable và taste skill lên bản mới nhất"*

**Gỡ bỏ hoàn toàn:**
> *"gỡ hai skill thiết kế ra khỏi repo"*

Cụ thể là xoá thư mục `.claude/skills/`, xoá `skills-lock.json`, và trả `.gitignore` về dòng
`.claude/` như cũ. Không để lại dấu vết. Website hoàn toàn không bị đụng tới.

**Kiểm tra còn nguyên vẹn:** trong một phiên Claude, nhờ chạy công cụ chẩn đoán của Impeccable.
Kết quả mong đợi là *"No drift found"*.

---

## 9. Xác nhận bàn giao

| Hạng mục | Trạng thái |
|---|---|
| Impeccable cài vào `.claude/skills/impeccable` | ✅ 129 file |
| Taste Skill cài vào `.claude/skills/design-taste-frontend` | ✅ 1 file |
| Chạy thử, công cụ chẩn đoán báo không lệch | ✅ |
| Cả hai đã hiện trong danh sách kỹ năng của Claude | ✅ |
| `.gitignore` mở đường cho `.claude/skills/` | ✅ |
| Đã commit và đẩy lên nhánh riêng | ✅ `25dcade` |
| Ghi vào `CHANGELOG.md` | ✅ |
| **Đã gộp vào `main`** | ❌ **chờ anh duyệt** |
| **Bật chế độ tự soát lỗi** | ❌ **chờ anh quyết** |
| **Chạy `/impeccable init`** | ❌ **khuyên chưa chạy** |
| File của website bị sửa | **0 file** |
