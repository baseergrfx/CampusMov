import svgPaths from "./svg-wp9g254yop";
import imgImage from "figma:asset/173b83b10b2480d111e72e5cf510c4c81faf85a1.png";
import imgImage1 from "figma:asset/75a10e0c1521ba4e1b6bedf3e967e2d5a90119fd.png";
import imgImageWithFallback from "figma:asset/f3b72ebe652b944b05ac991150b74bb18ff9895e.png";

function Container() {
  return <div className="absolute bg-white blur-[58.111px] filter h-[232.565px] left-[-13.35px] rounded-[2.05984e+07px] top-0 w-[232.316px]" data-name="Container" />;
}

function Container1() {
  return (
    <div className="absolute h-[222.41px] left-0 opacity-10 top-0 w-[289.264px]" data-name="Container">
      <Container />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[14.94px] relative shrink-0 w-[214.473px]" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[14.941px] left-[37.9px] not-italic text-[10.459px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-[-0.99px] translate-x-[-50%] whitespace-pre">Bus Arriving in</p>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] not-italic place-items-start relative shrink-0 text-center">
      <div className="[grid-area:1_/_1] flex flex-col font-['Arial:Bold',_sans-serif] h-[36.334px] justify-center ml-[8.799px] mt-[18.167px] relative text-[30.537px] text-white tracking-[-1.5268px] translate-x-[-50%] translate-y-[-50%] w-[17.598px]">
        <p className="leading-[61.074px]">3</p>
      </div>
      <p className="[grid-area:1_/_1] font-['Arial:Regular',_sans-serif] leading-[30.537px] ml-[43.816px] mt-[4.108px] relative text-[25.447px] text-[rgba(255,255,255,0.9)] text-nowrap translate-x-[-50%] whitespace-pre">min</p>
    </div>
  );
}

function Container2() {
  return <div className="absolute bg-[#8cff20] h-[7.268px] left-[12.71px] rounded-[2.05984e+07px] shadow-[0px_9.08px_13.62px_-2.724px_rgba(255,223,32,0.5),0px_3.632px_5.448px_-3.632px_rgba(255,223,32,0.5)] top-[6.93px] w-[7.26px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="absolute h-[8.176px] left-[20.88px] top-[calc(50%+0.558px)] translate-y-[-50%] w-[118.882px]" data-name="Text">
      <div className="absolute flex flex-col font-['Arial:Regular',_sans-serif] h-[10.902px] justify-center leading-[0] left-[57.17px] not-italic text-[7.264px] text-center text-white top-[3.63px] translate-x-[-50%] translate-y-[-50%] w-[108.899px]">
        <p className="leading-[18.16px]">AI Prediction: High Confidence</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] h-[20.92px] relative rounded-[2.05984e+07px] shrink-0 w-[144.082px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0.614px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[2.05984e+07px]" />
      <Container2 />
      <Text />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex gap-[12.105px] items-center justify-center left-[-14.3px] top-[0.14px] w-[258.467px]">
      <Group />
      <Container3 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[30.888px] relative shrink-0 w-full" data-name="Container">
      <Frame2 />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[22.018px] relative shrink-0 w-[21.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 23">
        <g id="Icon">
          <path d={svgPaths.p360a4000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.29234" />
          <path d={svgPaths.p2f1ee900} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.29234" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[48.445px] relative rounded-[18.047px] shadow-[0px_1.1px_3.301px_0px_rgba(0,0,0,0.1),0px_1.1px_2.201px_-1.1px_rgba(0,0,0,0.1)] shrink-0 w-[48.393px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[48.445px] items-center justify-center relative w-[48.393px]">
        <Icon />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="box-border content-stretch flex h-[11.604px] items-start mb-[-2.201px] relative shrink-0 w-[59.404px]" data-name="Paragraph">
      <p className="font-['Arial:Regular',_sans-serif] leading-[11.597px] not-italic relative shrink-0 text-[8.698px] text-nowrap text-white tracking-[0.2174px] uppercase whitespace-pre">Location</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[22.007px] mb-[-2.201px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Bold',_sans-serif] leading-[22.009px] left-0 not-italic text-[13.205px] text-white top-[-1.46px] w-[127.584px]">{`GT Road & Saddar`}</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="basis-0 grow h-[23.122px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[23.122px] items-start pb-[2.201px] pt-0 px-0 relative w-full">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[48.445px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[22.018px] relative shrink-0 w-[21.995px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 23">
        <g clipPath="url(#clip0_205_865)" id="Icon">
          <path d={svgPaths.p2fd14000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.29234" />
          <path d={svgPaths.p15787b80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.29234" />
        </g>
        <defs>
          <clipPath id="clip0_205_865">
            <rect fill="white" height="22.0182" width="21.9946" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[48.445px] relative rounded-[18.047px] shadow-[0px_1.1px_3.301px_0px_rgba(0,0,0,0.1),0px_1.1px_2.201px_-1.1px_rgba(0,0,0,0.1)] shrink-0 w-[48.393px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[48.445px] items-center justify-center relative w-[48.393px]">
        <Icon1 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[16.516px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[17.607px] left-[0.01px] not-italic text-[8.694px] text-white top-[2.98px] tracking-[0.3301px] uppercase w-[133.083px]">Arrival Time</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[20.92px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arial:Bold',_sans-serif] leading-[22.009px] left-[0.01px] not-italic text-[13.205px] text-white top-[-1.41px] w-[155.08px]">9:45 AM</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="basis-0 grow h-[34.132px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[34.132px] items-center justify-center relative w-full">
        <Paragraph3 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[40.739px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.816px] h-[165.156px] items-start left-[14.3px] top-[28.63px] w-[274.965px]" data-name="Container">
      <Paragraph />
      <Container4 />
      <Container7 />
      <Container10 />
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[#2b7fff] h-[6.595px] relative rounded-[2.49648e+07px] shrink-0 w-[6.588px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[6.595px] w-[6.588px]" />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[22.007px] relative shrink-0 w-[192.723px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.007px] relative w-[192.723px]">
        <p className="absolute font-['Arial:Regular',_sans-serif] leading-[22.009px] left-0 not-italic text-[15.406px] text-white top-[-1.46px] w-[193.576px]">1.5 km away from your stop</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="box-border content-stretch flex gap-[8.8px] h-[22.007px] items-center justify-center pl-0 pr-[0.012px] py-0 relative shrink-0 w-[265.377px]" data-name="Container">
      <Container12 />
      <Text1 />
    </div>
  );
}

function HomeDashboard() {
  return (
    <div className="absolute h-[40.361px] left-[12.1px] top-[181.67px] w-[265.377px]" data-name="HomeDashboard">
      <div aria-hidden="true" className="absolute border-[0.744px_0px_0px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[40.361px] items-start pb-[248.702px] pt-[7.703px] px-0 relative w-[265.377px]">
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function HomeDashboard1() {
  return (
    <div className="h-[222.41px] overflow-clip relative rounded-[21.792px] shadow-[0px_18.16px_22.7px_-4.54px_rgba(0,0,0,0.1),0px_7.264px_9.08px_-5.448px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="HomeDashboard">
      <Container1 />
      <Container11 />
      <HomeDashboard />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-0 size-[19.998px] top-[3.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_205_893)" id="Icon">
          <path d={svgPaths.p4bf7df2} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66647" />
          <path d={svgPaths.p90364f0} id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66647" />
        </g>
        <defs>
          <clipPath id="clip0_205_893">
            <rect fill="white" height="19.9977" width="19.9977" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CardTitle() {
  return (
    <div className="absolute h-[27.995px] left-[23.99px] top-[23.99px] w-[241.282px]" data-name="CardTitle">
      <Icon2 />
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[28px] left-[28px] not-italic text-[18px] text-neutral-950 text-nowrap top-[-1.65px] whitespace-pre">Live Tracking</p>
    </div>
  );
}

function Container14() {
  return <div className="absolute h-0 left-0 top-0 w-[289.264px]" data-name="Container" />;
}

function Container15() {
  return <div className="absolute left-[2.93e_6px] size-0 top-[1.68e_6px]" data-name="Container" />;
}

function Container16() {
  return <div className="absolute left-[-298px] size-0 top-[-505px]" data-name="Container" />;
}

function Image() {
  return (
    <div className="absolute left-[-22px] size-[255.997px] top-[391px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Image1() {
  return (
    <div className="absolute left-[234px] size-[255.997px] top-[391px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute left-0 size-0 top-0" data-name="Container">
      <Image />
      <Image1 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute left-0 size-0 top-0" data-name="Container">
      <Container16 />
      <Container17 />
    </div>
  );
}

function Icon3() {
  return <div className="h-[479.994px] shrink-0 w-full" data-name="Icon" />;
}

function Container19() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 size-0 top-0" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Container20() {
  return <div className="absolute left-[75.01px] size-[47.992px] top-[184.01px]" data-name="Container" />;
}

function Container21() {
  return <div className="absolute left-[47px] size-[39.995px] top-[207px]" data-name="Container" />;
}

function Container22() {
  return <div className="absolute left-[43.01px] size-[47.992px] top-[199.01px]" data-name="Container" />;
}

function Container23() {
  return (
    <div className="absolute left-0 size-0 top-0" data-name="Container">
      <Container20 />
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute left-0 size-0 top-0" data-name="Container">
      <Container15 />
      <Container18 />
      <Container19 />
      <Container23 />
    </div>
  );
}

function SmLinesBg() {
  return (
    <div className="absolute h-[779.959px] left-[-186.78px] top-[-2.49px] w-[743.903px]" data-name="sm lines bg">
      <div className="absolute inset-[-0.36%_-0.38%_-0.2%_-0.38%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 750 785">
          <g id="sm lines bg">
            <path d={svgPaths.p75a4e80} id="Vector 38" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.68096" />
            <path d={svgPaths.p116cc180} id="Vector 39" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.68096" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function SmLines() {
  return <div className="absolute h-[779.959px] left-[-186.78px] top-[-2.49px] w-[743.903px]" data-name="sm lines 1" />;
}

function Frame() {
  return (
    <div className="absolute left-[249.33px] size-[30.74px] top-[113.97px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31 31">
        <g clipPath="url(#clip0_205_848)" id="Frame">
          <path d={svgPaths.p2ff1d500} fill="var(--fill-0, #FF1F13)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_205_848">
            <rect fill="white" height="30.7398" width="30.7398" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function MainRoad() {
  return (
    <div className="absolute h-[764.21px] left-[-188.44px] top-[-1.65px] w-[754.264px]" data-name="main-road">
      <div className="absolute h-[764.21px] left-0 top-0 w-[754.264px]">
        <div className="absolute inset-[-0.52%_-0.34%_-0.71%_-0.32%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 760 774">
            <path d={svgPaths.p21163700} id="Vector 41" stroke="var(--stroke-0, white)" strokeWidth="10.889" />
          </svg>
        </div>
      </div>
      <div className="absolute font-['Roboto:SemiBold',_sans-serif] font-semibold leading-[normal] left-[99.47px] text-[17.069px] text-black text-center text-nowrap top-[108.65px] translate-x-[-50%] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">PURNIMA EDUCATION</p>
        <p>PRIMARY SCHOOL</p>
      </div>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.24958214163780212)+(var(--transform-inner-height)*0.9683536291122437)))] items-center justify-center left-[321.07px] top-[117.93px] translate-x-[-50%] w-[calc(1px*((var(--transform-inner-height)*0.24958214163780212)+(var(--transform-inner-width)*0.9683536291122437)))]" style={{ "--transform-inner-width": "85.5625", "--transform-inner-height": "10.390625" } as React.CSSProperties}>
        <div className="flex-none rotate-[14.453deg]">
          <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] not-italic relative text-[8.867px] text-black text-center text-nowrap whitespace-pre">Chesapeake Avenue</p>
        </div>
      </div>
      <p className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] left-[277.78px] not-italic text-[8.867px] text-black text-center text-nowrap top-[222.16px] translate-x-[-50%] whitespace-pre">Whittier Street</p>
      <p className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] left-[467.5px] not-italic text-[8.867px] text-black text-center text-nowrap top-[408.37px] translate-x-[-50%] whitespace-pre">McDowell Street</p>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.7300361394882202)+(var(--transform-inner-height)*0.6834084987640381)))] items-center justify-center left-[470.63px] top-[259.36px] translate-x-[-50%] w-[calc(1px*((var(--transform-inner-height)*0.7300361394882202)+(var(--transform-inner-width)*0.6834084987640381)))]" style={{ "--transform-inner-width": "82.0625", "--transform-inner-height": "10.390625" } as React.CSSProperties}>
        <div className="flex-none rotate-[313.111deg]">
          <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] not-italic relative text-[8.867px] text-black text-center text-nowrap whitespace-pre">Southwood Avenue</p>
        </div>
      </div>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.9997012615203857)+(var(--transform-inner-height)*0.024442575871944427)))] items-center justify-center left-[236.11px] top-[372.33px] translate-x-[-50%] w-[calc(1px*((var(--transform-inner-height)*0.9997012615203857)+(var(--transform-inner-width)*0.024442575871944427)))]" style={{ "--transform-inner-width": "63.0625", "--transform-inner-height": "10.390625" } as React.CSSProperties}>
        <div className="flex-none rotate-[271.401deg]">
          <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] not-italic relative text-[8.867px] text-black text-center text-nowrap whitespace-pre">Dresden Street</p>
        </div>
      </div>
      <p className="absolute font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] left-[445.71px] not-italic text-[8.867px] text-black text-center text-nowrap top-[9.34px] translate-x-[-50%] whitespace-pre">Chittenden Avenue</p>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.556560754776001)+(var(--transform-inner-height)*0.8308069109916687)))] items-center justify-center left-[306.3px] top-[527.9px] translate-x-[-50%] w-[calc(1px*((var(--transform-inner-height)*0.556560754776001)+(var(--transform-inner-width)*0.8308069109916687)))]" style={{ "--transform-inner-width": "57.140625", "--transform-inner-height": "10.390625" } as React.CSSProperties}>
        <div className="flex-none rotate-[33.818deg]">
          <p className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[normal] not-italic relative text-[8.867px] text-black text-center text-nowrap whitespace-pre">Bretton Place</p>
        </div>
      </div>
      <div className="absolute h-[301.487px] left-[237.8px] top-[141.46px] w-[172.616px]">
        <div className="absolute inset-[-1.39%_-4.41%_-1.45%_-4.53%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 189 311">
            <g filter="url(#filter0_dd_205_888)" id="Vector 43">
              <path d={svgPaths.p2d99eec0} stroke="var(--stroke-0, #13A9FF)" strokeWidth="7.68496" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="310.067" id="filter0_dd_205_888" width="188.065" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset />
                <feGaussianBlur stdDeviation="2.09858" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.075944 0 0 0 0 0.661179 0 0 0 0 1 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_205_888" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset />
                <feGaussianBlur stdDeviation="2.09858" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.075944 0 0 0 0 0.661179 0 0 0 0 1 0 0 0 0.25 0" />
                <feBlend in2="effect1_dropShadow_205_888" mode="normal" result="effect2_dropShadow_205_888" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_205_888" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute bg-[#646464] blur-[2.867px] filter inset-[18.55%_63.89%_80.68%_34.15%] rounded-[13.596px]" />
      <Frame />
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative size-[37.702px]" data-name="Frame">
      <div className="absolute inset-[-23.519%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 56">
          <g filter="url(#filter0_d_205_890)" id="Frame">
            <rect fill="var(--fill-0, white)" height="37.7023" rx="18.8512" width="37.7023" x="8.86726" y="8.86726" />
            <path d={svgPaths.p1f6e7500} fill="var(--fill-0, #13A9FF)" id="Vector" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="55.4368" id="filter0_d_205_890" width="55.4368" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feMorphology in="SourceAlpha" operator="dilate" radius="8.86726" result="effect1_dropShadow_205_890" />
              <feOffset />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.075944 0 0 0 0 0.661179 0 0 0 0 1 0 0 0 0.25 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_205_890" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_205_890" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Map() {
  return (
    <div className="absolute bg-[#f0f0f0] h-[750.761px] left-0 overflow-clip top-[-34.8px] w-[334px]" data-name="MAP 5">
      <div className="absolute h-[259.848px] left-[0.13px] top-[251.56px] w-[264.821px]">
        <div className="absolute bottom-[0.9%] left-[0.56%] right-[0.16%] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 263 258">
            <g id="Vector 42">
              <path d={svgPaths.p1fc7df00} fill="var(--fill-0, #B4E7C7)" />
              <path d={svgPaths.p261e0700} fill="var(--fill-0, #B4E7C7)" />
              <path d={svgPaths.p1291e00} fill="var(--fill-0, #B4E7C7)" />
            </g>
          </svg>
        </div>
      </div>
      <SmLinesBg />
      <SmLines />
      <div className="absolute h-[236.226px] left-[-186.78px] top-[514.31px] w-[749.291px]">
        <div className="absolute bottom-[21.36%] left-0 right-0 top-[0.1%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 750 186">
            <path d={svgPaths.pfddaf20} fill="var(--fill-0, #85D5EB)" id="Vector 41" />
          </svg>
        </div>
      </div>
      <MainRoad />
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.9413865804672241)+(var(--transform-inner-height)*0.3373296558856964)))] items-center justify-center left-[197.44px] top-[414.99px] w-[calc(1px*((var(--transform-inner-height)*0.9413865804672241)+(var(--transform-inner-width)*0.3373296558856964)))]" style={{ "--transform-inner-width": "37.6875", "--transform-inner-height": "37.6875" } as React.CSSProperties}>
        <div className="flex-none rotate-[289.714deg]">
          <Frame1 />
        </div>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex h-[22.311px] items-start relative shrink-0 w-full" data-name="Text">
      <div className="flex flex-col font-['Lucida_Console:Regular',_sans-serif] h-[22px] justify-center leading-[0] not-italic relative shrink-0 text-[22px] text-black text-center w-[14px]">
        <p className="leading-[30px]">+</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[29.991px] relative rounded-bl-[31px] rounded-br-[31px] rounded-tl-[33px] rounded-tr-[33px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#cccccc] border-[0px_0px_0.676px] border-solid inset-0 pointer-events-none rounded-bl-[31px] rounded-br-[31px] rounded-tl-[33px] rounded-tr-[33px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[29.991px] items-start pb-[0.676px] pl-[8.641px] pr-[7.648px] pt-[3.38px] relative w-full">
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex h-[22.311px] items-start relative shrink-0 w-full" data-name="Text">
      <div className="flex flex-col font-['Lucida_Console:Regular',_sans-serif] h-[22px] justify-center leading-[0] not-italic relative shrink-0 text-[22px] text-black text-center w-[14px]">
        <p className="leading-[30px]">−</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[29.991px] relative rounded-bl-[37px] rounded-br-[37px] rounded-tl-[35px] rounded-tr-[35px] shrink-0 w-full" data-name="Button">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[29.991px] items-start pb-0 pl-[8.641px] pr-[7.648px] pt-[3.38px] relative w-full">
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[9.537e_-6px] h-[62.687px] items-start left-[9.99px] p-[1.352px] rounded-[47px] top-[9.99px] w-[32.696px]" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute bg-[#dddddd] h-[400px] left-0 overflow-clip rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] top-0 w-[318px]" data-name="Container">
      <Container14 />
      <Container24 />
      <Map />
      <Container25 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[14.167px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p9d29680} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.18061" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-center left-[267px] rounded-[1.60718e+07px] shadow-[0px_7.084px_10.627px_-2.125px_rgba(0,0,0,0.1),0px_2.834px_4.251px_-2.834px_rgba(0,0,0,0.1)] size-[34px] top-[210px]" data-name="Button">
      <Icon4 />
    </div>
  );
}

function LiveMap() {
  return (
    <div className="absolute bg-gray-100 h-[255.997px] left-0 top-0 w-[289.264px]" data-name="LiveMap">
      <Container26 />
      <Button2 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[61.06px] size-[15.994px] top-[15.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M9.99609 2H13.9946V5.99847" id="Vector" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33282" />
          <path d="M13.9947 2L9.32983 6.66489" id="Vector_2" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33282" />
          <path d={svgPaths.p3b7eb380} id="Vector_3" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33282" />
          <path d={svgPaths.p3f8f9500} id="Vector_4" stroke="var(--stroke-0, #101828)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33282" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[42px] relative rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Button">
      <Icon5 />
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[20px] left-[93.05px] not-italic text-[#101828] text-[14px] text-nowrap top-[12.67px] whitespace-pre">View Full Screen</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-gradient-to-t box-border content-stretch flex flex-col from-[rgba(0,0,0,0.4)] h-[80px] items-start left-0 pb-0 pt-[23px] px-[15.994px] to-[rgba(0,0,0,0)] top-[240px] via-50% via-[rgba(0,0,0,0.2)] w-[318px]" data-name="Container">
      <Button3 />
    </div>
  );
}

function HomeDashboard2() {
  return (
    <div className="absolute h-[255.997px] left-0 top-[58.94px] w-[289.264px]" data-name="HomeDashboard">
      <LiveMap />
      <Container27 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white h-[373.945px] overflow-clip relative rounded-[16.4px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Card">
      <CardTitle />
      <HomeDashboard2 />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[27.995px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arial:Bold',_sans-serif] leading-[28px] left-[3.99px] not-italic text-[#101828] text-[18px] text-nowrap top-[-1.65px] whitespace-pre">Quick Actions</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[18.447px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <g id="Icon">
          <path d={svgPaths.p1e7c0500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d={svgPaths.p1d42d200} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d={svgPaths.p39313400} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d={svgPaths.p140f5680} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d="M16.1411 16.1406V16.1497" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d={svgPaths.p2c2f5000} id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d="M2.30566 9.22266H2.31469" id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d="M9.22339 2.30469H9.23242" id="Vector_8" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d="M9.22339 12.2969V12.3059" id="Vector_9" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d="M12.2979 9.22266H13.0665" id="Vector_10" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d="M16.1411 9.22266V9.23168" id="Vector_11" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d="M9.22339 16.1397V15.3711" id="Vector_12" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
        </g>
      </svg>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[30.761px] relative rounded-[10.543px] shadow-[0px_0.659px_1.977px_0px_rgba(0,0,0,0.1),0px_0.659px_1.318px_-0.659px_rgba(0,0,0,0.1)] shrink-0 w-[36.901px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[30.761px] items-center justify-center pl-0 pr-[0.007px] py-0 relative w-[36.901px]">
        <Icon6 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[13.171px] relative shrink-0 w-[52.689px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.171px] relative w-[52.689px]">
        <p className="absolute font-['Arial:Regular',_sans-serif] leading-[13.179px] left-0 not-italic text-[#101828] text-[9.225px] text-nowrap top-[-0.87px] whitespace-pre">My QR Code</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[7.901px] h-[73.802px] items-center justify-center left-0 p-[0.446px] rounded-[15.815px] top-0 w-[91.351px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.446px] border-[rgba(243,232,255,0.5)] border-solid inset-0 pointer-events-none rounded-[15.815px] shadow-[0px_2.636px_3.954px_-0.659px_rgba(0,0,0,0.1),0px_1.318px_2.636px_-1.318px_rgba(0,0,0,0.1)]" />
      <Container28 />
      <Text4 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[18.447px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <g id="Icon">
          <path d={svgPaths.p233a512c} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d={svgPaths.p2a0d2a00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
        </g>
      </svg>
    </div>
  );
}

function Container29() {
  return (
    <div className="bg-[#4c6ef5] h-[30.761px] relative rounded-[10.543px] shadow-[0px_0.659px_1.977px_0px_rgba(0,0,0,0.1),0px_0.659px_1.318px_-0.659px_rgba(0,0,0,0.1)] shrink-0 w-[36.901px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[30.761px] items-center justify-center pl-0 pr-[0.007px] py-0 relative w-[36.901px]">
        <Icon7 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[13.171px] relative shrink-0 w-[66.249px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.171px] relative w-[66.249px]">
        <p className="absolute font-['Arial:Regular',_sans-serif] leading-[13.179px] left-0 not-italic text-[#101828] text-[9.225px] text-nowrap top-[-0.87px] whitespace-pre">Report Absence</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[7.901px] h-[73.802px] items-center justify-center left-[99.25px] p-[0.446px] rounded-[15.815px] top-0 w-[91.358px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.446px] border-[rgba(243,232,255,0.5)] border-solid inset-0 pointer-events-none rounded-[15.815px] shadow-[0px_2.636px_3.954px_-0.659px_rgba(0,0,0,0.1),0px_1.318px_2.636px_-1.318px_rgba(0,0,0,0.1)]" />
      <Container29 />
      <Text5 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[18.447px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <g id="Icon">
          <path d="M6.14893 1.53906V4.61356" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d="M12.2979 1.53906V4.61356" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d={svgPaths.p1a4df680} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d="M2.30566 7.6875H16.1409" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
        </g>
      </svg>
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-[#4c6ef5] h-[28.994px] relative rounded-[10.543px] shadow-[0px_0.659px_1.977px_0px_rgba(0,0,0,0.1),0px_0.659px_1.318px_-0.659px_rgba(0,0,0,0.1)] shrink-0 w-[36.901px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[28.994px] items-center justify-center pl-0 pr-[0.007px] py-0 relative w-[36.901px]">
        <Icon8 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[26.341px] relative shrink-0 w-[69.382px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[26.341px] relative w-[69.382px]">
        <p className="absolute font-['Arial:Regular',_sans-serif] leading-[13.179px] left-[34.81px] not-italic text-[#101828] text-[9.225px] text-center top-[-0.66px] translate-x-[-50%] w-[69.19px]">Attendance History</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[7.901px] h-[73.802px] items-center justify-center left-[199px] pb-[0.446px] pt-[0.453px] px-[0.446px] rounded-[15.815px] top-[0.01px] w-[91.351px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.446px] border-[rgba(243,232,255,0.5)] border-solid inset-0 pointer-events-none rounded-[15.815px] shadow-[0px_2.636px_3.954px_-0.659px_rgba(0,0,0,0.1),0px_1.318px_2.636px_-1.318px_rgba(0,0,0,0.1)]" />
      <Container30 />
      <Text6 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[18.447px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <g id="Icon">
          <path d={svgPaths.pf7c3400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d="M1.53711 7.68555H16.9096" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
        </g>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[#4c6ef5] h-[30.761px] relative rounded-[10.543px] shadow-[0px_0.659px_1.977px_0px_rgba(0,0,0,0.1),0px_0.659px_1.318px_-0.659px_rgba(0,0,0,0.1)] shrink-0 w-[36.901px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[30.761px] items-center justify-center pl-0 pr-[0.007px] py-0 relative w-[36.901px]">
        <Icon9 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[13.171px] relative shrink-0 w-[56.963px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.171px] relative w-[56.963px]">
        <p className="absolute font-['Arial:Regular',_sans-serif] leading-[13.179px] left-0 not-italic text-[#101828] text-[9.225px] text-nowrap top-[-0.87px] whitespace-pre">Transport Fee</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[7.901px] h-[73.802px] items-center justify-center left-0 p-[0.446px] rounded-[15.815px] top-[81.7px] w-[91.358px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.446px] border-[rgba(243,232,255,0.5)] border-solid inset-0 pointer-events-none rounded-[15.815px] shadow-[0px_2.636px_3.954px_-0.659px_rgba(0,0,0,0.1),0px_1.318px_2.636px_-1.318px_rgba(0,0,0,0.1)]" />
      <Container31 />
      <Text7 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[18.447px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <g id="Icon">
          <path d={svgPaths.p342e3fb8} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d={svgPaths.pb7638c0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d={svgPaths.pf7f6880} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
        </g>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[30.761px] relative rounded-[10.543px] shadow-[0px_0.659px_1.977px_0px_rgba(0,0,0,0.1),0px_0.659px_1.318px_-0.659px_rgba(0,0,0,0.1)] shrink-0 w-[36.901px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[30.761px] items-center justify-center pl-0 pr-[0.007px] py-0 relative w-[36.901px]">
        <Icon10 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[13.171px] relative shrink-0 w-[55.55px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.171px] relative w-[55.55px]">
        <p className="absolute font-['Arial:Regular',_sans-serif] leading-[13.179px] left-0 not-italic text-[#101828] text-[9.225px] text-nowrap top-[-0.87px] whitespace-pre">Route Details</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[7.901px] h-[73.802px] items-center justify-center left-[99px] p-[0.446px] rounded-[15.815px] top-[82.01px] w-[91.351px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.446px] border-[rgba(243,232,255,0.5)] border-solid inset-0 pointer-events-none rounded-[15.815px] shadow-[0px_2.636px_3.954px_-0.659px_rgba(0,0,0,0.1),0px_1.318px_2.636px_-1.318px_rgba(0,0,0,0.1)]" />
      <Container32 />
      <Text8 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[18.447px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <g id="Icon">
          <path d={svgPaths.p3078c200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
          <path d={svgPaths.pdeab072} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.92156" />
        </g>
      </svg>
    </div>
  );
}

function Container33() {
  return (
    <div className="bg-[#4c6ef5] h-[26.358px] relative rounded-[10.543px] shadow-[0px_0.659px_1.977px_0px_rgba(0,0,0,0.1),0px_0.659px_1.318px_-0.659px_rgba(0,0,0,0.1)] shrink-0 w-[36.901px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[26.358px] items-center justify-center pl-0 pr-[0.007px] py-0 relative w-[36.901px]">
        <Icon11 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[26.341px] relative shrink-0 w-[69.389px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[26.341px] relative w-[69.389px]">
        <p className="absolute font-['Arial:Regular',_sans-serif] leading-[13.179px] left-[calc(50%-0.29px)] not-italic text-[#101828] text-[9.225px] text-center top-[-0.65px] translate-x-[-50%] w-[59.964px]">{`Profile & Settings`}</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[7.901px] h-[73.802px] items-center justify-center left-[202px] pb-[0.446px] pt-[0.452px] px-[0.446px] rounded-[15.815px] top-[82.01px] w-[91.358px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[0.446px] border-[rgba(243,232,255,0.5)] border-solid inset-0 pointer-events-none rounded-[15.815px] shadow-[0px_2.636px_3.954px_-0.659px_rgba(0,0,0,0.1),0px_1.318px_2.636px_-1.318px_rgba(0,0,0,0.1)]" />
      <Container33 />
      <Text9 />
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[237px] relative shrink-0 w-[290px]" data-name="Container">
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
      <Button9 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col gap-[15.994px] h-[404px] items-start relative shrink-0 w-[302px]" data-name="Container">
      <Heading />
      <Container34 />
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[1423.07px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[19.998px] h-[1423.07px] items-start pb-0 pt-[23.991px] px-[19.998px] relative w-full">
          <HomeDashboard1 />
          <Card />
          <Container35 />
        </div>
      </div>
    </div>
  );
}

function HomeDashboard3() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[1628px] items-start left-0 pb-0 pt-[76.663px] px-0 top-0 w-[355px]" data-name="HomeDashboard">
      <Container36 />
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="absolute h-[23.991px] left-[20px] top-[26px] w-[79.991px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-[12px] size-[19.998px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_205_821)" id="Icon">
          <path d={svgPaths.p22e39380} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66647" />
          <path d={svgPaths.p31da330} id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66647" />
        </g>
        <defs>
          <clipPath id="clip0_205_821">
            <rect fill="white" height="19.9977" width="19.9977" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[15.994px] relative shrink-0 w-[6.666px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[15.994px] items-start relative w-[6.666px]">
        <p className="font-['Arial:Bold',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-center left-[28px] p-[1.352px] rounded-[2.2686e+07px] size-[19.998px] top-[-3.99px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.352px] border-solid border-white inset-0 pointer-events-none rounded-[2.2686e+07px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
      <Text10 />
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute left-[284.99px] rounded-[2.2686e+07px] size-[43.999px] top-[15.99px]" data-name="Button">
      <Icon12 />
      <Container37 />
    </div>
  );
}

function HomeDashboard4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] h-[76px] left-0 top-0 w-[355px]" data-name="HomeDashboard">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.676px] border-black border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <ImageWithFallback />
      <Button10 />
    </div>
  );
}

export default function MainApp() {
  return (
    <div className="bg-gray-50 relative size-full" data-name="MainApp">
      <HomeDashboard3 />
      <HomeDashboard4 />
    </div>
  );
}