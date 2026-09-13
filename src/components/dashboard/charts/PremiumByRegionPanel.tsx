import Panel from "../Panel";
import { BRAND, formatPHP } from "../data/dashboardDemoData";

export default function PremiumByRegionPanel() {
  const premiumByCollege = [
    { name: "Faculty of Medicine and Surgery", amount: 612400 },
    { name: "College of Nursing", amount: 578200 },
    { name: "Faculty of Pharmacy", amount: 541800 },
    { name: "Faculty of Engineering", amount: 519300 },
    {
      name: "Institute of Information and Computing Sciences",
      amount: 498600,
    },
    { name: "College of Rehabilitation Sciences", amount: 471200 },
    { name: "College of Science", amount: 452900 },
    {
      name: "College of Commerce and Business Administration",
      amount: 431500,
    },
    { name: "Alfredo M. Velayo College of Accountancy", amount: 408700 },
    {
      name: "College of Tourism and Hospitality Management",
      amount: 386400,
    },
    { name: "College of Education", amount: 362100 },
    { name: "Faculty of Arts and Letters", amount: 341800 },
    {
      name: "Institute of Physical Education and Athletics",
      amount: 322500,
    },
    { name: "College of Architecture", amount: 298700 },
    { name: "College of Fine Arts and Design", amount: 276300 },
    { name: "Faculty of Philosophy", amount: 251900 },
    { name: "Conservatory of Music", amount: 233600 },
    { name: "Faculty of Civil Law", amount: 214200 },
    { name: "UST Graduate School", amount: 198500 },
    { name: "Faculty of Canon Law", amount: 176300 },
    { name: "UST Graduate School of Law", amount: 158900 },
  ];
  const maxCollegePremium = Math.max(
    ...premiumByCollege.map((college) => college.amount),
  );
  const visibleColleges = premiumByCollege.slice(0, 8);
  const otherPremium = premiumByCollege
    .slice(8)
    .reduce((total, college) => total + college.amount, 0);
  const displayColleges = [
    ...visibleColleges,
    { name: "Other Colleges (13)", amount: otherPremium },
  ];

  return (
    <Panel
      title="Premium by College"
      iconColor="text-amber-600"
    >
      <div className="space-y-2">
        {displayColleges.map((college) => (
          <div
            key={college.name}
            className="grid grid-cols-[minmax(10rem,2fr)_minmax(0,5fr)_4.5rem] items-center gap-2 text-[11px] min-h-6"
          >
            <span className="text-stone-600 leading-tight">{college.name}</span>
            <div className="bg-[#F2ECE1] rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${(college.amount / Math.max(maxCollegePremium, otherPremium)) * 100}%`,
                  background: college.name.startsWith("Other")
                    ? BRAND.tan
                    : BRAND.amber,
                }}
              />
            </div>
            <span className="w-14 shrink-0 text-right text-stone-500">
              {formatPHP(college.amount)}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
