# 서열학원 NAI 태그 모음

작업: 이미지 제작용. 사용자가 NAI 태그를 요청하면 이 파일을 그대로 건네면 된다.
캐릭터 태그 출처: Peropix 프리셋 `서열학원_상반신_표정포즈_336.json`의 `_기본` 슬롯(시트 기준으로 교정된 확정판). 증명사진용으로 표정, 구도, 배경, 소품 줄을 뺐다.

## 공통 설정

- **그림체(Base):** Peropix 폴더의 `prompts/base/V5_수정_v2.txt`를 앞에 붙인다.
- **Undesired:** 평소 쓰는 v5_undesired(Notion 'NovelAI Prompt Chunks 백업')에 아래 증명사진 전용 UC를 덧붙인다.
- **크기:** 증명사진 896×1152(세로 3:4 근처), 사진첩 1024×1024. 사이트는 CSS로 잘라서 보여주므로 비율이 조금 달라도 된다.
- **파일명:** 증명사진 `img/<id>.png`, 사진첩 `img/photos/p1.png`부터 `p9.png`.
- **다인 장면:** 전역 프롬프트에 인원수(1girl, 2boys 등)를 쓰고, 캐릭터별 프롬프트에 인물 태그를 나눠 넣는다. 인물 태그는 아래 증명사진 블록의 윗부분(소품 제외 외형 줄)을 그대로 복사해 쓰면 된다.

## 증명사진 공통 구도 태그 (모든 인물 뒤에 붙임)

```
passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 증명사진 전용 추가 UC

```
smile, open mouth, grin, teeth, hands, holding, weapon, props, dutch angle, from above, from below, three-quarter view, from side, profile, tilted head, looking away, side glance, closed eyes, shadow on wall, gradient background, patterned background, school classroom, text, border
```

## 증명사진 24명 (img/<id>.png)

각 블록 = 외형 줄 + 구도 줄. 표정은 모두 무표정(neutral expression, closed mouth)이라 송곳니(fang) 태그는 뺐고, 홍준기의 감은 눈은 그의 특징이라 그대로 뒀다.

### 박종혁 (park-jonghyeok)

```
1man, solo, male focus, masculine, tall, muscular male, broad shoulders, tan skin,

short blue-black hair, messy swept-back hair, parted bangs, hair between eyes, short sidelocks,

red eyes, sanpaku, sharp eyes, thick eyebrows, scar across cheek, handsome, mature male,

white collared shirt, open collar, sleeves rolled up, loosened black necktie, wrinkled shirt,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 김상철 (kim-sangcheol)

```
1man, solo, male focus, masculine, muscular male, 1.1::broad shoulders::, thick neck, thick arms, veiny forearms, large pectorals, tight shirt, tan skin,

very short dark auburn hair, crew cut, short spiky hair, short bangs, cropped sides,

grayish brown eyes, tsurime, sharp eyes, thick eyebrows, eyebrow slit, handsome,

1.2::white collared shirt::, -1::pink shirt::, open collar, sleeves rolled up,

multiple ear piercings, silver hoop earrings,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 윤재욱 (yun-jaeuk)

```
1boy, solo, male focus, masculine, athletic male, lean muscular, fair skin,

short olive-gray brown hair, -1::streaked hair::, messy spiky hair, thick spiky hair, parted bangs, hair between eyes, short sidelocks,

amber eyes, round eyes, thick eyebrows, nose bandage,

white collared shirt, open collar, dark teal track jacket, unzipped jacket, white stripes on sleeves,

0.8::sports goggles on forehead ::, goggles on head, black sports goggles, clear lenses, hair visible,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 신동하 (shin-dongha)

```
1man, solo, male focus, masculine, tall, slender male, pale skin,

medium black hair, wolf cut, shaggy hair, layered hair, long swept bangs, hair between eyes, long sidelocks, long nape hair,

gray eyes, jitome, half-closed eyes, narrow eyes, mole under eye, handsome,

white collared shirt, oversized beige cardigan, loosened black necktie,

silver ear cuff, silver rings,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 한성민 (han-seongmin)

```
1boy, solo, male focus, masculine, slender male, lean, fair skin,

short navy blue hair, messy layered hair, asymmetrical bangs, long side-swept bangs, hair between eyes, short low ponytail, messy nape, ahoge,

light amber eyes, tareme, slightly droopy eyes, thin eyebrows, handsome, youthful face,

white collared shirt, open collar, cropped black school jacket, standing collar, red necktie,

black stud earrings, fingerless gloves,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 이경태 (lee-gyeongtae)

```
1man, solo, male focus, masculine, tall, slender male, pale skin,

medium ash blonde hair, dark roots, wolf cut, layered hair, center-parted bangs, long sidelocks, long nape hair,

golden eyes, tsurime, narrow eyes, half-closed eyes, handsome,

black collared shirt, white necktie, black school jacket, open jacket,

gold chain necklaces, multiple ear piercings, silver earrings,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 문혜정 (moon-hyejeong)

```
1girl, solo, tall, curvy, large breasts, fair skin,

very long auburn hair, voluminous hair, wavy hair, loose curls, side-swept bangs, curled sidelocks,

green eyes, tsurime, long eyelashes, makeup, glossy lips, beauty mark,

white collared shirt, fitted black blazer, loosened black necktie,

large hoop earrings, multiple ear piercings, long nails, nail polish,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 오재필 (oh-jaepil)

```
1man, solo, male focus, masculine, tall, skinny, pale skin,

medium dark purple hair, shoulder-length hair, 1.2::long sidelocks::, sidelocks reaching chest, hair tucked behind one ear, asymmetrical bangs, hair over one eye, layered hair, -1::very long hair::,

blue-gray eyes, narrow eyes, thin eyebrows, handsome,

white collared shirt, gray sweater vest, black necktie, long sleeves,

0.8::rectangular glasses ::, black gloves,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 고은주 (go-eunju)

```
1girl, solo, tall, slender, large breasts, pale skin,

very long white hair, straight hair, 0.85::corn double bun ::, two side buns, ahoge, parted bangs, hair between eyes, long sidelocks,

red eyes, jitome, narrow eyes, thin eyebrows,

white collared shirt, black necktie, oversized gray cardigan,

black gloves,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 한정우 (han-jeongu)

```
1man, solo, male focus, masculine, tall, slender male, fair skin,

medium ash brown hair, short layered hair, curtain bangs, long sidelocks, long nape hair,

gray-blue eyes, tsurime, droopy eyes, long eyelashes, handsome,

white collared shirt, open collar, loosened black necktie, sleeves rolled up,

0.8::wearing black sunglasses ::, black sunglasses, multiple ear piercings, silver earrings,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 서미정 (seo-mijeong)

```
1girl, solo, tall, slender, elegant, large breasts, pale skin,

very long black hair, straight hair, hime cut, blunt bangs, long sidelocks, 0.8::red inner hair ::, red hair ribbons,

dark purple eyes, almond eyes, calm eyes, long eyelashes, mole under eye,

white collared shirt, fitted black blazer, black necktie, neat clothes, red lining,

red ribbon hair ornaments, black nail polish,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 장유진 (jang-yujin)

```
1girl, solo, tall, athletic female, toned, large breasts, tan skin,

0.9::very long blonde hair ::, high twintails, voluminous hair, wavy hair, messy hair, parted bangs, long sidelocks,

green eyes, tsurime, sharp eyes, long eyelashes,

white collared shirt, loosened black necktie, black blazer, open blazer,

multiple ear piercings, silver earrings, black nail polish,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 최혜원 (choi-hyewon)

```
1girl, solo, slender, pale skin, petite,

medium gray hair, high side ponytail, fluffy ponytail, straight hair, layered hair, side-swept bangs, long sidelocks, red hair ribbon, tsundere,

red eyes, tsurime, narrow eyes, long eyelashes, thin eyebrows,

white collared shirt, fitted black blazer, black necktie, neat clothes,

red rectangular hairclip,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 안지영 (an-jiyeong)

```
1girl, solo, curvy, large breasts, fair skin,

long peach hair, 0.85::double bun ::, twin braids, wispy bangs, long sidelocks, loose hair strands,

mint green eyes, round eyes, big eyes, long eyelashes,

white collared shirt, beige cardigan,

star hairclips, colorful bracelets,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 송은정 (song-eunjeong)

```
1girl, solo, petite, slender, pale skin,

medium lavender hair, low twintails, straight hair, parted bangs, forehead, long sidelocks,

mole near mouth,

white collared shirt, dark sweater vest, black necktie, neat clothes,

white hair ribbons,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 노미나 (no-mina)

```
1girl, solo, petite, slim, pale skin,

very long black and purple hair, two-tone hair, high side ponytail, uneven bangs, long sidelocks, ahoge, floating hair,

purple eyes, 0.9::star-shaped pupils ::, round eyes,

oversized black blazer, white collared shirt, loosened necktie,

multiple star hairclips, mismatched earrings, colorful nail polish,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 양희진 (yang-huijin)

```
1girl, solo, tall, skinny, large breasts, pale skin,

shoulder-length auburn hair, dark roots, wolf cut, shaggy hair, messy hair, hair between eyes, long bangs, 0.8::bright red hair at nape ::, red inner hair,

yellow eyes, sanpaku, half-closed eyes,

white collared shirt, open collar, loosened black necktie, oversized dark olive hoodie, open hoodie,

snakebite piercing, black heart choker, heart pendant,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 배정아 (bae-jeonga)

```
1girl, solo, petite, skinny, pale skin,

very long dark green hair, messy hair, two low braids, blunt bangs, hair over eyes, loose hair strands,

purple eyes, jitome, dark circles,

oversized dark cardigan, white collared shirt,

black choker, occult charm, safety pin accessories,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 황보은경 (hwangbo-eungyeong)

```
1girl, solo, tall, curvy, large breasts, toned body, tan skin,

very long apricot orange hair, wavy hair, high side ponytail, voluminous hair, side-swept bangs, long curled sidelocks, loose hair strands,

golden eyes, tareme, half-closed eyes, long eyelashes, mole under eye, gyaru, makeup, glossy lips,

white collared shirt, fitted shirt, open collar, cropped black school jacket, open jacket,

large gold hoop earrings, heart-shaped sunglasses on head, gold bracelets, long nails, orange nail polish,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 표해원 (pyo-haewon)

```
1boy, solo, male focus, femboy, androgynous, petite, short, slender, narrow shoulders, pale skin, smooth skin,

short black hair, layered short hair, choppy ends, -1::bob cut::, 1.1::single silver streak in bangs ::, silver strand over one eye, eyes visible through hair, silver underlayer, short silver strands at nape, -1::long hair::, -1::silver sidelocks::,

light gray eyes, round eyes, slightly droopy eyes, large eyes, long eyelashes, small pupils, thin eyebrows, pretty face, mole under eye,

white collared shirt, oversized black hoodie, open hoodie, black sweater vest, black necktie,

black choker, multiple silver hairpins, crossed hairpins, silver ear cuff, black nail polish, oversized sleeves,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 정수진 (jeong-sujin)

```
1girl, solo, average build, large breasts, fair skin,

long chestnut brown hair, wavy hair, half-up braid, see-through bangs, long sidelocks,

amber eyes, tareme, soft eyes,

white collared shirt, beige cardigan,

small flower hairclip,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 차보람 (cha-boram)

```
1girl, solo, petite, slim, fair skin,

short yellow-green hair, bob cut, side ponytail, asymmetrical bangs, long sidelocks,

orange eyes, tsurime, cat eyes,

oversized dark hoodie, white collared shirt,

shoulder bag, hairclip,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 이동규 (lee-donggyu)

```
1man, solo, male focus, masculine, skinny, average height, fair skin,

medium dusty blue hair, 1.1::black roots::, two-tone hair, black hair at back, low ponytail, messy hair, long parted bangs, hair between eyes, sidelocks,

green eyes, droopy eyes, thin eyebrows,

white collared shirt, gray sweater vest,

thick-rimmed glasses, earphones,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

### 홍준기 (hong-jungi)

```
1man, solo, male focus, masculine, tall, slender, pale skin,

medium white hair, 0.8::black underlayer ::, straight hair, half-up hair, center-parted bangs, long sidelocks, black nape hair,

0.9::closed eyes ::, thin eyebrows, handsome,

white collared shirt, black blazer, loosened black necktie, open collar,

single black earring, black bead bracelet,

passport photo, id photo, identification photo, formal portrait, front view, facing viewer, straight-on, symmetrical, head and shoulders, upper body, centered, looking at viewer,

neutral expression, closed mouth, no smile,

simple background, white background, flat lighting, even lighting, plain wall, no props,
```

## 사진첩 9장 (img/photos/p1.png ~ p9.png, 1024×1024)

> 2026-11-21 최신판: Peropix 슬롯 세트 `서열학원_미니홈피_사진첩_10`에 장면마다 한 칸짜리 프롬프트로 다시 썼다(인물별 위치 + 머리·눈·대표 옷을 1.2 가중치로 묶어 섞임 방지, 장면별 카메라 연출 추가). 아래 블록은 캐릭터 프롬프트로 나눠 쓰는 옛 버전이다.

전역 프롬프트에 장면 태그를 쓰고, 인물은 캐릭터 프롬프트로 나눠 넣는다. 아래 `[전역]` 아래에는 공통 스냅 질감 태그가 이미 붙어 있다. 사진첩은 2006년 폴더폰이나 디지털카메라로 찍은 스냅 느낌이 목표다.

### P1 · 우리 방이에요.. 정리는 해원이 담당;;

**[전역]**
```
2boys, indoors, dormitory room, tidy desk, single bed, window, daylight, candid snapshot, 2000s digital camera photo, flash photography, slightly overexposed, soft film grain, everyday scene,
```

**[캐릭터] 표해원**
```
1boy, solo, male focus, femboy, androgynous, petite, short, slender, narrow shoulders, pale skin, smooth skin,

short black hair, layered short hair, choppy ends, -1::bob cut::, 1.1::single silver streak in bangs ::, silver strand over one eye, eyes visible through hair, silver underlayer, short silver strands at nape, -1::long hair::, -1::silver sidelocks::,

light gray eyes, round eyes, slightly droopy eyes, large eyes, long eyelashes, small pupils, thin eyebrows, pretty face, mole under eye,

white collared shirt, oversized black hoodie, open hoodie, black sweater vest, black necktie,

black choker, multiple silver hairpins, crossed hairpins, silver ear cuff, black nail polish, oversized sleeves,

standing, folding clothes, finger pointing, scolding, annoyed, looking at viewer,
```

**[캐릭터] 이동규**
```
1man, solo, male focus, masculine, skinny, average height, fair skin,

medium dusty blue hair, 1.1::black roots::, two-tone hair, black hair at back, low ponytail, messy hair, long parted bangs, hair between eyes, sidelocks,

green eyes, droopy eyes, thin eyebrows,

white collared shirt, gray sweater vest,

thick-rimmed glasses, earphones,

standing, nervous smile, sweat drop, awkward, hands together,
```

### P2 · 학생회 회의 중... 저는 기록만 ㅎㅎ

**[전역]**
```
1girl, 3boys, group photo, facing viewer, student council meeting room, long table, papers on table, fluorescent light, sitting at table, candid snapshot, 2000s digital camera photo, flash photography, slightly overexposed, soft film grain, everyday scene,
```

**[캐릭터] 이동규**
```
1man, solo, male focus, masculine, skinny, average height, fair skin,

medium dusty blue hair, 1.1::black roots::, two-tone hair, black hair at back, low ponytail, messy hair, long parted bangs, hair between eyes, sidelocks,

green eyes, droopy eyes, thin eyebrows,

white collared shirt, gray sweater vest,

thick-rimmed glasses, earphones,

sitting, writing in notebook, holding pen, nervous smile,
```

**[캐릭터] 최혜원**
```
1girl, solo, slender, pale skin, petite,

medium gray hair, high side ponytail, fluffy ponytail, straight hair, layered hair, side-swept bangs, long sidelocks, red hair ribbon, tsundere,

red eyes, tsurime, narrow eyes, long eyelashes, thin eyebrows,

white collared shirt, fitted black blazer, black necktie, neat clothes,

red rectangular hairclip,

sitting, pointing at paper, frown, stern,
```

**[캐릭터] 오재필**
```
1man, solo, male focus, masculine, tall, skinny, pale skin,

medium dark purple hair, shoulder-length hair, 1.2::long sidelocks::, sidelocks reaching chest, hair tucked behind one ear, asymmetrical bangs, hair over one eye, layered hair, -1::very long hair::,

blue-gray eyes, narrow eyes, thin eyebrows, handsome,

white collared shirt, gray sweater vest, black necktie, long sleeves,

0.8::rectangular glasses ::, black gloves,

sitting, smiling, hands clasped,
```

**[캐릭터] 신동하**
```
1man, solo, male focus, masculine, tall, slender male, pale skin,

medium black hair, wolf cut, shaggy hair, layered hair, long swept bangs, hair between eyes, long sidelocks, long nape hair,

gray eyes, jitome, half-closed eyes, narrow eyes, mole under eye, handsome,

white collared shirt, oversized beige cardigan, loosened black necktie,

silver ear cuff, silver rings,

sitting, head down on desk, sleeping, arms folded on table,
```

### P3 · 지영이는 오늘도 소문이 많네요 ㅎㅎ;;

**[전역]**
```
1girl, 1boy, school hallway, lockers, motion blur, shaky camera, slightly out of focus, candid snapshot, 2000s digital camera photo, flash photography, slightly overexposed, soft film grain, everyday scene,
```

**[캐릭터] 안지영**
```
1girl, solo, curvy, large breasts, fair skin,

long peach hair, 0.85::double bun ::, twin braids, wispy bangs, long sidelocks, loose hair strands,

mint green eyes, round eyes, big eyes, long eyelashes,

white collared shirt, beige cardigan,

star hairclips, colorful bracelets,

talking excitedly, open mouth, gesturing with both hands, leaning forward,
```

**[캐릭터] 이동규**
```
1man, solo, male focus, masculine, skinny, average height, fair skin,

medium dusty blue hair, 1.1::black roots::, two-tone hair, black hair at back, low ponytail, messy hair, long parted bangs, hair between eyes, sidelocks,

green eyes, droopy eyes, thin eyebrows,

white collared shirt, gray sweater vest,

thick-rimmed glasses, earphones,

listening, troubled smile, sweat drop, leaning back,
```

### P4 · 복도가 오늘도 시끄럽네요... ㅠㅠ

**[전역]**
```
3boys, school hallway, wide shot, from a distance, lively, candid snapshot, 2000s digital camera photo, flash photography, slightly overexposed, soft film grain, everyday scene,
```

**[캐릭터] 윤재욱**
```
1boy, solo, male focus, masculine, athletic male, lean muscular, fair skin,

short olive-gray brown hair, -1::streaked hair::, messy spiky hair, thick spiky hair, parted bangs, hair between eyes, short sidelocks,

amber eyes, round eyes, thick eyebrows, nose bandage,

white collared shirt, open collar, dark teal track jacket, unzipped jacket, white stripes on sleeves,

0.8::sports goggles on forehead ::, goggles on head, black sports goggles, clear lenses, hair visible,

laughing, headlock, roughhousing,
```

**[캐릭터] 한성민**
```
1boy, solo, male focus, masculine, slender male, lean, fair skin,

short navy blue hair, messy layered hair, asymmetrical bangs, long side-swept bangs, hair between eyes, short low ponytail, messy nape, ahoge,

light amber eyes, tareme, slightly droopy eyes, thin eyebrows, handsome, youthful face,

white collared shirt, open collar, cropped black school jacket, standing collar, red necktie,

black stud earrings, fingerless gloves,

struggling, laughing, being held in headlock,
```

**[캐릭터] 이동규**
```
1man, solo, male focus, masculine, skinny, average height, fair skin,

medium dusty blue hair, 1.1::black roots::, two-tone hair, black hair at back, low ponytail, messy hair, long parted bangs, hair between eyes, sidelocks,

green eyes, droopy eyes, thin eyebrows,

white collared shirt, gray sweater vest,

thick-rimmed glasses, earphones,

standing at edge of frame, glancing sideways, nervous, hugging notebook,
```

### P5 · 수진이가 걱정하지 말라고 했어요 ㅎㅎ

**[전역]**
```
1girl, 1boy, outdoors, in front of school building, daylight, natural light, candid snapshot, 2000s digital camera photo, flash photography, slightly overexposed, soft film grain, everyday scene,
```

**[캐릭터] 정수진**
```
1girl, solo, average build, large breasts, fair skin,

long chestnut brown hair, wavy hair, half-up braid, see-through bangs, long sidelocks,

amber eyes, tareme, soft eyes,

white collared shirt, beige cardigan,

small flower hairclip,

standing, index finger raised, lecturing, gentle worried expression,
```

**[캐릭터] 이동규**
```
1man, solo, male focus, masculine, skinny, average height, fair skin,

medium dusty blue hair, 1.1::black roots::, two-tone hair, black hair at back, low ponytail, messy hair, long parted bangs, hair between eyes, sidelocks,

green eyes, droopy eyes, thin eyebrows,

white collared shirt, gray sweater vest,

thick-rimmed glasses, earphones,

standing, nodding, listening, nervous smile,
```

### P6 · 회의록은 잃어버리면 안 되니까요;;

**[전역]**
```
close-up, hand focus, desk, stacked meeting documents, pens, notebooks, indoors, soft calm lighting, no humans, out of frame, candid snapshot, 2000s digital camera photo, flash photography, slightly overexposed, soft film grain, everyday scene,
```

**[캐릭터] 이동규**
```
1man, solo, male focus, masculine, skinny, average height, fair skin,

medium dusty blue hair, 1.1::black roots::, two-tone hair, black hair at back, low ponytail, messy hair, long parted bangs, hair between eyes, sidelocks,

green eyes, droopy eyes, thin eyebrows,

white collared shirt, gray sweater vest,

thick-rimmed glasses, earphones,

only a hand visible, white sleeve, gray sweater vest cuff, arranging papers, neatening stack of documents,
```

### P7 · 회장님이랑 해원이가 또 말다툼을;;

**[전역]**
```
1girl, 2boys, student council meeting room, long table, tense atmosphere, candid snapshot, 2000s digital camera photo, flash photography, slightly overexposed, soft film grain, everyday scene,
```

**[캐릭터] 최혜원**
```
1girl, solo, slender, pale skin, petite,

medium gray hair, high side ponytail, fluffy ponytail, straight hair, layered hair, side-swept bangs, long sidelocks, red hair ribbon, tsundere,

red eyes, tsurime, narrow eyes, long eyelashes, thin eyebrows,

white collared shirt, fitted black blazer, black necktie, neat clothes,

red rectangular hairclip,

standing, pointing at other person, angry, glaring,
```

**[캐릭터] 표해원**
```
1boy, solo, male focus, femboy, androgynous, petite, short, slender, narrow shoulders, pale skin, smooth skin,

short black hair, layered short hair, choppy ends, -1::bob cut::, 1.1::single silver streak in bangs ::, silver strand over one eye, eyes visible through hair, silver underlayer, short silver strands at nape, -1::long hair::, -1::silver sidelocks::,

light gray eyes, round eyes, slightly droopy eyes, large eyes, long eyelashes, small pupils, thin eyebrows, pretty face, mole under eye,

white collared shirt, oversized black hoodie, open hoodie, black sweater vest, black necktie,

black choker, multiple silver hairpins, crossed hairpins, silver ear cuff, black nail polish, oversized sleeves,

standing, arms crossed, annoyed, glaring back, pout,
```

**[캐릭터] 이동규**
```
1man, solo, male focus, masculine, skinny, average height, fair skin,

medium dusty blue hair, 1.1::black roots::, two-tone hair, black hair at back, low ponytail, messy hair, long parted bangs, hair between eyes, sidelocks,

green eyes, droopy eyes, thin eyebrows,

white collared shirt, gray sweater vest,

thick-rimmed glasses, earphones,

standing between them, holding notebook, checking notes, nervous, sweat drop,
```

### P8 · 정아가 캠코더를 들고 왔어요...;;

**[전역]**
```
2girls, 1boy, school hallway, indoors, dim light, candid snapshot, 2000s digital camera photo, flash photography, slightly overexposed, soft film grain, everyday scene,
```

**[캐릭터] 배정아**
```
1girl, solo, petite, skinny, pale skin,

very long dark green hair, messy hair, two low braids, blunt bangs, hair over eyes, loose hair strands,

purple eyes, jitome, dark circles,

oversized dark cardigan, white collared shirt,

black choker, occult charm, safety pin accessories,

holding camcorder, recording, looking through camcorder, hunched posture,
```

**[캐릭터] 양희진**
```
1girl, solo, tall, skinny, large breasts, pale skin,

shoulder-length auburn hair, dark roots, wolf cut, shaggy hair, messy hair, hair between eyes, long bangs, 0.8::bright red hair at nape ::, red inner hair,

yellow eyes, sanpaku, half-closed eyes,

white collared shirt, open collar, loosened black necktie, oversized dark olive hoodie, open hoodie,

snakebite piercing, black heart choker, heart pendant,

leaning on wall, slouching, half-closed eyes, watching, hands in pockets,
```

**[캐릭터] 이동규**
```
1man, solo, male focus, masculine, skinny, average height, fair skin,

medium dusty blue hair, 1.1::black roots::, two-tone hair, black hair at back, low ponytail, messy hair, long parted bangs, hair between eyes, sidelocks,

green eyes, droopy eyes, thin eyebrows,

white collared shirt, gray sweater vest,

thick-rimmed glasses, earphones,

awkward smile, glancing at camera, nervous, stiff posture,
```

### P9 · 미나 선배는 정말 겁이 없으세요;;

**[전역]**
```
2girls, 1boy, school hallway, lively, wide shot, candid snapshot, 2000s digital camera photo, flash photography, slightly overexposed, soft film grain, everyday scene,
```

**[캐릭터] 황보은경**
```
1girl, solo, tall, curvy, large breasts, toned body, tan skin,

very long apricot orange hair, wavy hair, high side ponytail, voluminous hair, side-swept bangs, long curled sidelocks, loose hair strands,

golden eyes, tareme, half-closed eyes, long eyelashes, mole under eye, gyaru, makeup, glossy lips,

white collared shirt, fitted shirt, open collar, cropped black school jacket, open jacket,

large gold hoop earrings, heart-shaped sunglasses on head, gold bracelets, long nails, orange nail polish,

piggyback, carrying person on back, laughing, standing,
```

**[캐릭터] 노미나**
```
1girl, solo, petite, slim, pale skin,

very long black and purple hair, two-tone hair, high side ponytail, uneven bangs, long sidelocks, ahoge, floating hair,

purple eyes, 0.9::star-shaped pupils ::, round eyes,

oversized black blazer, white collared shirt, loosened necktie,

multiple star hairclips, mismatched earrings, colorful nail polish,

piggyback, riding on back, arms raised, cheering, laughing,
```

**[캐릭터] 이동규**
```
1man, solo, male focus, masculine, skinny, average height, fair skin,

medium dusty blue hair, 1.1::black roots::, two-tone hair, black hair at back, low ponytail, messy hair, long parted bangs, hair between eyes, sidelocks,

green eyes, droopy eyes, thin eyebrows,

white collared shirt, gray sweater vest,

thick-rimmed glasses, earphones,

standing, flustered, blush, hands up, looking at them,
```

## 예비 사진 프롬프트

### 상철 선배랑 재욱 선배... 또 싸워요

기존 P10 프롬프트. 사진첩 제작 목록에는 포함하지 않는다.

**[전역]**
```
3boys, school hallway, dynamic angle, dramatic, wide shot, candid snapshot, 2000s digital camera photo, flash photography, slightly overexposed, soft film grain, everyday scene,
```

**[캐릭터] 김상철**
```
1man, solo, male focus, masculine, muscular male, 1.1::broad shoulders::, thick neck, thick arms, veiny forearms, large pectorals, tight shirt, tan skin,

very short dark auburn hair, crew cut, short spiky hair, short bangs, cropped sides,

grayish brown eyes, tsurime, sharp eyes, thick eyebrows, eyebrow slit, handsome,

1.2::white collared shirt::, -1::pink shirt::, open collar, sleeves rolled up,

multiple ear piercings, silver hoop earrings,

shouting, angry, forehead to forehead, fist raised,
```

**[캐릭터] 윤재욱**
```
1boy, solo, male focus, masculine, athletic male, lean muscular, fair skin,

short olive-gray brown hair, -1::streaked hair::, messy spiky hair, thick spiky hair, parted bangs, hair between eyes, short sidelocks,

amber eyes, round eyes, thick eyebrows, nose bandage,

white collared shirt, open collar, dark teal track jacket, unzipped jacket, white stripes on sleeves,

0.8::sports goggles on forehead ::, goggles on head, black sports goggles, clear lenses, hair visible,

shouting back, angry, forehead to forehead, fist raised,
```

**[캐릭터] 이동규**
```
1man, solo, male focus, masculine, skinny, average height, fair skin,

medium dusty blue hair, 1.1::black roots::, two-tone hair, black hair at back, low ponytail, messy hair, long parted bangs, hair between eyes, sidelocks,

green eyes, droopy eyes, thin eyebrows,

white collared shirt, gray sweater vest,

thick-rimmed glasses, earphones,

small in background, standing far away, nervous, hugging notebook, glancing,
```

## 미니룸 (img/room.png)

NAI로 만들지 않는다. Codex가 픽셀아트로 만들어 이미 `img/room.png`에 있다(이동규 캐릭터는 안 들어 있음). 밤 버전 대안은 `img/room-alt-night.png`.

## 이동규 미니미 (img/lee-donggyu.png)

이미지 목록상 이동규 프로필과 같은 이미지를 쓴다. 위 증명사진 24명 중 이동규 블록으로 만든 이미지를 그대로 `img/lee-donggyu.png`로 저장하면 된다.

## 이 파일에 없는 것

학교 홈페이지의 공지, 교직원, 시설 사진 24장(공지 8, 교직원 6, 시설 10)은 설명만 `data/image-needs.md`에 있고 NAI 태그는 아직 만들지 않았다.
