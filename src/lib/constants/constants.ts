const BACKGROUND_SIZE = {
  xs: {
    width: 360,
    height: 258,
  },
  sm: {
    width: 430,
    height: 300,
  },
  md: {
    width: 615,
    height: 430,
  },
  xl: {
    width: 1180,
    height: 820,
  },
};

const INVESTING_GAME_INITIAL_POINT = {
  LITTLE_PIG: 700,
};

// 그냥 클릭했을때 눌리는 효과 여기에 써둘게
// active:scale-95 transition-all duration-100
// className="active:scale-95 transition-all duration-100"

const IMAGE_URLS = {
  common: {
    coin: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749845855/user-coin_nbpwdm",
    name: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749845855/user-name_xyiwu8",
    logout:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749847143/logout_dzoadd",
    star: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750391714/star_exp_vldb1o",
    loading_bg: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750394379/loading_bg_2_xybuad",
    back_arrow_black: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750335615/back_arrow_black_gpxrtd",
    back_arrow_white: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750335615/back_arrow_white_qabhqn",
    back_arrow_gray: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750335615/back_arrow_gray_pm2mvr",
    point_popo: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750725203/point_popo_g0js7h",
    cry_popo: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750748431/cry_popo_dlbbio",
    speech_bubble: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1751024818/speech_bubble1_uhbc7z",
    speech_bubble_2: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1751026361/speech_bubble3_1_2_goevx4",
  },
  main: {
    bg: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749831440/main-background_lviawu",
    popo: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-popo_b21l9f",
    quiz: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749845179/main-quiz_y8wptc",
    attendance:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749845179/main-attendance_mgavdh",
    market:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-market_vgxt72",
    diary:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833241/main-diary_g3zxla",
    raising:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-raising_hj1oyq",
    saving:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-saving_afcqna",
    quest:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-quest_z5swuz",
    investing:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-investing_wtfhom",
  },
  market: {
    bg: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1751255245/market-bg_suy6d9",
    popo: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749349063/market_popo_lr9sm4",
    npc_shop:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1751249741/market-npc_qqtpg1",
    npc_shop_bg:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749349063/npc_shop_bg_twcppj",
    inventory:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1751258482/market-invento_ylzjgh",
    inventory_bg:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749349063/inventory_bg_mpmlen",
    parent_shop:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1751263965/market-parent_xo4qta",
    parent_shop_bg:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749349063/parent_shop_bg_el0my1",
    wood_title:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749349063/wood_title_lfdikm",
    wood_title_parent:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/wood_title_parent_jjdjp9",
    modal_popo:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/shop_popo_pai28k",
  },
  items: {
    donut:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/donut_nwgs8g",
    icecream:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/icecream_i4ujjj",
    cookie:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/cookie_wkipjd",
    cheese:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/cheese_hqymu2",
    hamburger:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/hamburger_md6xet",
    carrot:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/carrot_i3xbjj",
    Bungeoppang:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/Bungeoppang_lfkhh8",
    bread:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/bread_nykeqe",
    broccoli:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/broccoli_nmpcqu",
    fish: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/fish_hqsqfs",
    feed2:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/feed2_tdcvbu",
    apple:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/apple_dyzpm6",
    feed: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/feed_ipplbf",
    watermelon:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/watermelon_vrrndc",
    strawberry:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/strawberry_kkh2sv",
    dish: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/dish_pnmiis",
  },
  attandance: {
    circle_popo:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750725227/attandance_circle_mhq4yb",
    masic_popo:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749515991/masic_popo_sgclsk",
  },
  investing_game: {
    little_pig: {
      little_pig_bg:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_pig_bg_ldqey6",
      little_pig_1:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_pig_1_tkbfmy",
      little_pig_2:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_pig_2_apemg6",
      little_pig_3:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_pig_3_rui4m7",
      little_pig_bulb:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_pig_bulb_ojzwkt",
      little_pig_chart:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_pig_chart_fyizrh",
      little_pig_box:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_pig_box_g5j55l",
      little_siren_pig:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_siren_pig_hb9qdp",
      little_pig_close:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_pig_close_gnyawi",
      little_news_pig:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_news_pig_ogynzl",
    },
    truck: {
      truck_bg:
        "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1751261320/investing-truck_rppafp",
      taco_truck:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/taco_truck_i7bcbo",
      sandwich_truck:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/sandwich_truck_h2r7qf",
      icecream_truck:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/icecream_truck_akgqup",
    },
    ninja: {
      ninja_bg:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750318032/ninja_bg_uqcua9",
      ninja1:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/ninja1_wrrxcv",
      ninja2:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/ninja2_tbpzzb",
      ninja3:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/ninja3_nybk2b",
    },
    masic: {
      masic_bg:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750318033/magic_bg_p5jjam",
      masic_1:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/masic1_welc4w",
      masic_2:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/masic2_zodylg",

      masic_3:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/masic3_b9xjo9",
    },
    base:{
      good_popo:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750318033/good_popo_rc92ze",
      news_popo:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750318033/news_popo_dnninl",
      siren_popo:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750318033/siren_popo_gfuo6t",
      chart_popo:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750318033/chart_popo_zge2rf",
      x_popo:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750333955/xpopo_vnpgcm",
    }
  },
  investing: {
    bg: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1750022907/investing-bg_pvefqn",
    poni: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1750024423/investing-poni_zrfrbe",
  },

  sound: {
    on: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750222986/sound_ga7lq2",
    off: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750222986/Xsound_q2ec8r",
  },

  quest: {
    modal_popo:"https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1750166596/quest-modal-popo_l4ldtl",
    quest_map_page: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749002225/quest-map-page",
    quest_map_page_parent: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749003144/quest-map-page-parent",
    quest_map_page_daily: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749003248/quest-map-page-daily",
    quest_map_parents_popo: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749014097/quest-map-parents-popo",
    quest_map_daily_poni: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749012328/quest-map-daily-poni",
    quest_map_title: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749009914/quest-map-title-",
    quest_map_daily_poni_parent: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749014888/image-Photoroom_5_calb9b",
    quest_map_daily_poni_parent_2: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749020143/image-Photoroom_8_bfxs5w",
    quest_map_daily_poni_parent_3: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749021774/Group-1000002186_mxtdvh",
    quest_complete_bg:"https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749109575/iPad_Pro_12.9__-_34_p3cnin",
  },
  quest_detail:{
    quest_detail_bg:"https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749086237/iPad_Pro_12.9__-_63_fl49sp",
    quest_detail_popo:"https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749107825/ChatGPT_Image_May_26__2025__04_02_46_PM-removebg-preview_1_1_swqc8d",
    quest_detail_signs:"https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749086355/image_437_pgtezv",
    quest_detail_mini_popo:"https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749524170/ChatGPT_Image_2025%E1%84%82%E1%85%A7%E1%86%AB_6%E1%84%8B%E1%85%AF%E1%86%AF_10%E1%84%8B%E1%85%B5%E1%86%AF_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11_55_17-Photoroom_er3mem",
  },
  raising: {
    apple:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_apple_nvewgu",
    watermelon:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_watermelon_mtkh5k",
    nest: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750728025/raising_nest_g7swed",
    fish: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_fish_b6v2o5",
    character5:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_character5_oygkcg",
    character4:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_character4_kcscvg",
    character3:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_character3_vskzce",
    character2:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_character2_sjrocs",
    character1:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_character1_eyjdnq",
    carrot:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_carrot_udhxsx",
    broccoli:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_broccoli_pt0evy",
    bread:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_bread_rjrnm2",
    background:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750725132/rasing_bg_cthfbm",
  },

  login: {
    bg: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155969/register_background_t1zcbz",
  },

  savings: {
    bg: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155990/savings_background_bf0hz5",
    star: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155990/savings_star_jtuc8d",
    popo: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155990/savings_character_ofguqf",
  },

  emotionDiary: {
    bg: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749237608/ChatGPT_Image_2025%E1%84%82%E1%85%A7%E1%86%AB_6%E1%84%8B%E1%85%AF%E1%86%AF_7%E1%84%8B%E1%85%B5%E1%86%AF_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_04_17_24_1_yzgzkl",
    left_arrow: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749614463/Polygon_4_bejfpz",
    right_arrow: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749614463/Polygon_4_bejfpz",
    modal_popo: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749625181/emotion-popo_wpurr1",
    modal_popo2: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749625181/emotion-popo_wpurr1",
    write_bg: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749622517/diary-write-bg_bld452",
    write_popo: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749625181/emotion-popo_wpurr1",
    write_bubble:"https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749625685/image-removebg-preview_22_1_sajx43"
  },

  emotionList: {
    happy:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749623811/emotion-happy_b57kwc",
    angry:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749623428/emotion-angry_yrpv3l",
    sad: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749623512/emotion-sad_ahoplf",
    soso: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749623755/emotion-soso_n5tczw",
    love: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749623669/emotion-love_zljlxe",
    embarrassed:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749623606/emotion-embarrassed_npzyuk",
  },

  quiz: {
    bg: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1750380247/quiz-bg_iwbvqj",
    popo: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1750380194/quiz-popo_spfyup",
    o: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1750816235/quiz-o-popo_cyzcv8",
    x:"https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1750816279/quiz-x-popo_harxd1"
  }

};

// import MainBackgroundMusic from "@/assets/sound/main.mp3";
// import LittlePigSound from "@/assets/sound/chapter_1.mp3";
// import TruckSound from "@/assets/sound/chapter_2.mp3";
// import MasicSound from "@/assets/sound/chapter_3.mp3";
// import NinjaSound from "@/assets/sound/chapter_4.mp3";

// const SOUND_URLS = {
//   main: MainBackgroundMusic,
//   little_pig: LittlePigSound,
//   truck: TruckSound,
//   masic: MasicSound,
//   ninja: NinjaSound,
// };

export { BACKGROUND_SIZE, INVESTING_GAME_INITIAL_POINT, IMAGE_URLS };

export const emotionList = [{}] as const;