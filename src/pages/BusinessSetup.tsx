import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import reportImage from "@/assets/Inditex_RegulationRadar.png";

const REPORT_MARKDOWN = `## **RegulationRadar Analysis: Automated Compliance & Liability Assessment**

SYSTEM STATUS: ACTIVE  
ANALYSIS PROTOCOL: EU GREEN DEAL COMPLIANCE SUITE (v4.2)  
TARGET ENTITY: INDUSTRIA DE DISEÑO TEXTIL, S.A. (INDITEX)  
PROCESSING MODE: DEEP INSPECTION / PREDICTIVE LIABILITY MODELING

### **3.1 Introduction: The Regulatory Tsunami and Operational Friction**

The European textile sector is currently navigating a regulatory inflection point of unprecedented magnitude. The "EU Strategy for Sustainable and Circular Textiles" represents a paradigm shift from voluntary corporate social responsibility (CSR) to mandatory legal compliance. The overarching legislative intent is explicitly stated: to drive a transition where "fast fashion is out of fashion" and ensuring that by 2030, all textile products placed on the EU market are durable, repairable, and recyclable.18 For an entity like Inditex, whose operational supremacy relies on speed, volume, and frequent collection turnover 2, this legislative horizon presents existential friction. The RegulationRadar system has analyzed the ingested compliance artifacts against four primary regulatory vectors: the Digital Product Passport (DPP), the Ecodesign for Sustainable Products Regulation (ESPR), Chemical Safety (REACH/ZDHC), and Corporate Sustainability Due Diligence (CSDDD).

The analysis reveals a dichotomy: Inditex demonstrates industry-leading capability in chemical management and Tier 1 traceability, yet faces systemic vulnerabilities in data granularity and circularity engineering required by the new laws. The discontinuation of the "Join Life" label 4 signals a recognition of the shifting landscape, where self-declared eco-labels are being rendered obsolete by the Green Claims Directive in favor of standardized, data-backed metrics.

### **3.2 Vector Analysis 1: The Digital Product Passport (DPP) Readiness**

Regulatory Mandate:  
Under the Ecodesign for Sustainable Products Regulation (ESPR), practically all textile products placed on the EU market by approximately 2027 will require a Digital Product Passport. This is a machine-readable digital record, accessible via a data carrier (such as a QR code or RFID tag) on the product, which provides granular data on the product's sustainability profile, including material composition, chemical content, recyclability, and supply chain origin.20 The system must comply with decentralized technical standards (currently being drafted by CEN/CENELEC) and support interoperability.22  
Data Gap Analysis:  
The RegulationRadar system has cross-referenced the Supply_Chain_Traceability_Dataset and Inditex_Annual_Report against the draft data requirements for the DPP.  
Critical Finding: The Granularity Cliff  
Inditex possesses high-fidelity data at the Stock Keeping Unit (SKU) level regarding Tier 1 (garment assembly) and Tier 2 (wet processing) suppliers.3 The "Green to Wear" program ensures that the specific dyeing mill for a batch of fabric is known and audited.7 However, the DPP mandate pushes traceability requirements further upstream to Tier 3 (Spinning) and Tier 4 (Raw Material Cultivation). The analysis of the Inditex_Annual_Report reveals a heavy reliance on "mass balance" certification schemes for organic cotton (such as OCS or Better Cotton).23  
Mass balance is a chain-of-custody model where certified material is mixed with conventional material, and "credits" are transferred. While currently accepted for voluntary claims, the DPP's "substantiated green claims" requirement favors physical segregation or identity preservation. If the DPP requires a consumer to scan a QR code and see the specific farm origin of the cotton in *that exact shirt*, mass balance systems fail to provide this physical link. The ingested data shows no evidence of a "batch-level" unique identifier (UID) system capable of carrying this data through the manufacturing process to the final consumer.

Technical Readiness Assessment:  
The entity is currently unprepared for the serialization requirement. Current inventory systems track types of products (SKUs), but the DPP implies a move toward tracking batches or even items. Without a serialized data architecture, Zara cannot accurately report batch-specific attributes (e.g., "This batch used 20% recycled cotton from Supplier A, while the next batch used Supplier B"). This lack of granularity is a "High Risk" compliance gap.  
Projected Friction:  
The draft standards for the DPP suggest the inclusion of a "Repairability Score" and "Durability Index".20 Currently, the ingested ClearToWear and GreenToWear standards focus on chemical safety and environmental manufacturing metrics. There is no automated data field in the current dataset for "repairability" (e.g., ease of disassembly, availability of spare buttons/zippers). The absence of this data layer will result in incomplete DPP profiles, potentially barring products from the EU market or resulting in low public-facing sustainability scores.

| DPP Data Attribute | Current Data Availability (Simulated) | Compliance Status | Remediation Required |
| :---- | :---- | :---- | :---- |
| **Unique Product ID** | SKU Level Only | **Non-Compliant** | Implement Batch/Serial UID |
| **Fiber Composition** | High (Aggregated %) | Compliant | None |
| **Chemical Safety** | High (Clear to Wear) | Compliant | None |
| **Raw Material Origin** | Mass Balance (Tier 4) | **At Risk** | Transition to Physical Traceability |
| **Recyclability Class** | Qualitative Only | **At Risk** | Quantifiable recyclability metric needed |
| **Repairability Score** | Non-Existent | **Critical Gap** | Develop repairability indexing protocol |

### **3.3 Vector Analysis 2: Ecodesign (ESPR) and Circularity Engineering**

Regulatory Mandate:  
The ESPR empowers the European Commission to set performance requirements for products to ensure they are durable, reliable, reusable, upgradable, and reparable. It specifically targets the "destruction of unsold consumer goods," mandating transparency and eventually banning the practice.24 Furthermore, the regulation incentivizes "closed-loop" recycling, where textiles are recycled back into textiles (fiber-to-fiber) rather than downcycled.26  
The Poly-Cotton Blend Bottleneck:  
The RegulationRadar analysis identifies a fundamental material science conflict within Zara's product catalog. The Inditex_Annual_Report and Fibres Plan emphasize a transition to "preferred fibers".5 However, a significant proportion of the "fast fashion" catalog relies on poly-cotton blends (e.g., 60% cotton, 40% polyester) to maintain low price points and fabric stability.  
System Insight:  
Blended fibers act as a contaminant in mechanical recycling streams. Mechanical recyclers cannot separate the polyester from the cotton; the resulting "shoddy" is of low quality and typically downcycled into insulation or mattress stuffing, not new clothing. While the Inditex_Annual_Report mentions investments in chemical recycling startups like CIRC and Infinited Fiber 6, these technologies are currently at the pilot or early industrial stage (Technology Readiness Level 6-7). They are not yet capable of absorbing the millions of tons of blended waste generated annually.  
The "Destruction of Unsold Goods" Liability:  
The ban on destroying unsold goods 26 poses a direct financial risk. Zara's "pull" model 2 is efficient, but no forecasting is perfect. In the absence of viable recycling pathways for blends, any unsold blended inventory becomes a liability. The entity cannot burn it (energy recovery is often the last resort in the waste hierarchy) and cannot landfill it. The Waste_Management_Protocol ingested shows strong management of pre-consumer waste (cutting scraps), which is uniform and easy to recycle. However, it lacks granular data on the fate of unsold finished goods in distributed markets. If these goods are exported to non-OECD countries, the new Waste Shipment Regulation 26 will restrict this unless the receiving country proves it can manage the waste sustainably—a high hurdle for many current export destinations.  
Durability vs. Business Model:  
The ESPR's durability requirement challenges the core value proposition of fast fashion. "Durability" has two components: physical (will the fabric tear?) and emotional (will the style remain desirable?). ClearToWear ensures physical quality (pilling, colorfastness).9 However, the business model thrives on emotional obsolescence—the rapid replacement of styles. If the EU introduces a mandatory "Durability Label," a $20 trend-driven garment designed for a 6-week fashion cycle will score poorly against a classic, durable competitor product. This transparency could depress sales velocity or damage brand equity among eco-conscious consumers.

### **3.4 Vector Analysis 3: Chemical Safety and Zero Discharge**

Regulatory Mandate:  
The EU's "Chemicals Strategy for Sustainability" aims for a toxic-free environment, reinforcing REACH and introducing new restrictions on substances like PFAS ("forever chemicals") and microplastics.9  
Compliance Strength:  
Here, Inditex demonstrates its strongest compliance posture. The The_List_by_Inditex and Zara_ClearToWear_RSL documents 8 reveal a sophisticated chemical management infrastructure.

* **The List:** By classifying chemical formulations into A, B, and C categories before they even enter the factory, Inditex practices "Input Stream Management." This is far superior to testing finished garments, as it prevents hazardous chemicals from entering the supply chain in the first place.  
* **ZDHC Alignment:** The explicit alignment with the Zero Discharge of Hazardous Chemicals (ZDHC) Roadmap to Zero 27 ensures that Inditex is using a standardized language with its suppliers.  
* **PFAS Phase-Out:** The PFAS_Free_Manufacturing_Guidance 14 indicates that Inditex is proactively eliminating per- and polyfluoroalkyl substances ahead of the universal EU restriction. This is a critical risk mitigation strategy, as PFAS litigation is rising globally.

The Microplastic Vulnerability:  
Despite chemical success, the "physical chemical" risk of microplastics remains. The Inditex_Annual_Report notes a high usage of synthetic fibers (polyester).23 The EU is exploring requirements for filters on washing machines, but also potentially labeling or design requirements for textiles to reduce shedding.18 Fleece and loosely woven synthetics are high shedders. The RegulationRadar identifies this as a "Latent Risk." Unlike chemical bans which are binary, microplastic shedding is a spectrum, and current compliance documents do not show a standardized testing protocol for "fiber release" during washing.

### **3.5 Vector Analysis 4: Corporate Sustainability Due Diligence (CSDDD)**

Regulatory Mandate:  
The CSDDD requires large companies to identify, prevent, mitigate, and account for adverse human rights and environmental impacts in their own operations and their value chains. It introduces civil liability, meaning victims can sue companies in EU courts for harms caused in the supply chain.28  
Geopolitical Risk: The Turkey Water Crisis:  
The analysis of Audit_Report_Turkey alongside meteorological data for the Buyuk Menderes basin 10 uncovers a severe "Environmental Human Rights" risk.

* **Context:** Turkey is a key "proximity" hub for Zara, providing cotton and manufacturing. The region is experiencing acute drought/water scarcity.  
* **The CSDDD Link:** The directive covers environmental impacts that infringe on human rights, such as the right to clean water. Cotton is an extremely water-intensive crop. If Zara's suppliers are extracting groundwater in a drought-stricken region to meet production quotas, effectively competing with local communities for drinking water, this constitutes an "adverse impact" under CSDDD.  
* **Liability:** Unlike voluntary CSR, CSDDD allows for litigation. If a Turkish community sues Inditex alleging that the company's purchasing practices (high volume, low speed, demand for cotton) drove suppliers to deplete the local aquifer, Inditex must prove it conducted "Enhanced Due Diligence."  
* **Audit Gaps:** The Audit_Report_Turkey focuses on "Green to Wear" metrics (wastewater quality) but does not necessarily capture the *contextual* water stress (water quantity relative to basin availability). A facility might meet the efficiency standard ("Grade A") while still consuming too much water for the local ecosystem to sustain.

Social Compliance and Living Wages:  
The Social_Compliance_Audit_Morocco 17 indicates compliance with statutory minimum wages. However, the CSDDD pushes for "Living Incomes." In Morocco, the gap between the legal minimum wage and a living wage can be significant. The system flags a risk of "Audit Fatigue," where the pressure for speed in the proximity cluster leads to authorized overtime limits being breached or subcontracting to unauthorized units where labor standards are lower. The CSDDD requires Inditex to change its purchasing practices (e.g., giving suppliers more lead time or paying higher prices) to enable living wages—a direct conflict with the "fast" and "affordable" value proposition.

### **3.6 Climate Transition & Carbon Liability**

Regulatory Mandate:  
The Corporate Sustainability Reporting Directive (CSRD) and the upcoming Green Claims Directive require rigorous, audited reporting of Scope 1, 2, and 3 emissions. The EU Carbon Border Adjustment Mechanism (CBAM) may eventually expand to cover textiles, effectively placing a carbon tax on imports.30  
The Proximity Trade-Off:  
Inditex's "Proximity Sourcing" reduces inventory risk but has a complex carbon profile. Trucking from Turkey/Morocco to Spain has a higher carbon intensity per ton-kilometer than ocean freight from Asia, although the distance is shorter. More importantly, the energy mix of the manufacturing country matters. Turkey and Morocco have historically relied heavily on fossil fuels.

* **The Risk:** If Inditex does not actively finance the renewable energy transition of its Tier 2 suppliers (dyeing mills) in these regions, its Scope 3 emissions will remain high. The Inditex_Climate_Transition_Plan 15 outlines targets (-50% by 2030), but the mechanism for implementation in the supply chain is the challenge.  
* **Cotton Yield Volatility:** The projected 19% drop in Turkish cotton production 10 implies Inditex may need to import cotton *into* Turkey to keep the mills running. This "double transport" (Import Cotton -> Turkey -> Export Garment -> Spain) would significantly spike the carbon footprint of the "Proximity" cluster, complicating the 2030 reduction targets.

---

## **4. Risk Scoring & Predictive Liability Modeling**

Composite Risk Score: 68 / 100 (Moderate-High Risk)  
A score below 50 indicates low risk; above 80 indicates critical/existential risk.  
**Score Breakdown:**

* **Chemical Safety:** 15/20 (Strong internal controls, high readiness).  
* **Circularity (ESPR):** 10/25 (High exposure due to blends and business model).  
* **Traceability (DPP):** 12/20 (Good Tier 1/2 visibility, poor Tier 4 traceability).  
* **Due Diligence (CSDDD):** 18/25 (Robust auditing, but high geopolitical water risk).  
* **Climate/Carbon:** 13/10 (Ambition is high, but dependent on supplier energy transition).

**Projected Financial Liability Scenarios (Annualized Impact 2027-2030):**

The RegulationRadar algorithm projects potential financial impacts based on the identified gaps.

| Liability Vector | Mechanism | Estimated Financial Impact (Annual) | Probability |
| :---- | :---- | :---- | :---- |
| **EPR Malus Fees** | "Eco-modulation" fees applied to non-recyclable blended garments under revised Waste Framework Directive. | **€150M - €300M** | **Very High** (>90%) |
| **CSDDD Penalties** | Max fine of 5% of global turnover for systemic due diligence failure (e.g., water crisis litigation). | **Up to €1.93 Billion** (Worst Case) | **Low-Moderate** (10-20%) |
| **Inventory Write-offs** | Ban on destruction of unsold goods forcing donation or costly recycling of deadstock. | **€50M - €100M** | **Moderate** (40-60%) |
| **Greenwashing Litigation** | Civil suits regarding unsubstantiated "sustainable" claims (Green Claims Directive). | **€20M - €50M** + Reputational Damage | **Moderate** (30%) |
| **CBAM / Carbon Tax** | Potential carbon levies on imports from high-carbon grids (Turkey/Morocco). | **€50M - €120M** | **Moderate-High** (50-70%) |

**Scenario Modeling: The "Hydrological Shock" (2026)**

* **Trigger:** A "Day Zero" water event in the Izmir/Buyuk Menderes region during the cotton growing season.  
* **Cascade Effect:** Local authorities prioritize municipal water over industrial/agricultural use. Textile mills face mandated shutdowns.  
* **Operational Impact:** Disruption of the "Proximity" supply chain. Zara is forced to shift production to Asia (Bangladesh/Vietnam), increasing lead times from 3 weeks to 6 months. This breaks the "Fast Fashion" model for that season, leading to missed trends and markdowns.  
* **Legal Impact:** NGOs investigate the link between the textile mills' water withdrawal and the crisis. A CSDDD complaint is filed in Spanish courts alleging Inditex failed to mitigate the foreseeable risk of water stress.

---

## **5. Strategic Recommendations for Remediation**

Based on the automated analysis, the RegulationRadar platform recommends the following prioritized actions for Inditex S.A.:

1. Operationalize the Digital Product Passport (Immediate Action):  
The entity must move beyond PDF-based reporting. Launch a pilot project to assign serialized Unique Identifiers (UIDs) to a core product line (e.g., the "Join Life" successor basic denim). This pilot must integrate with the Tier 3/4 suppliers to test the flow of "custody" data rather than mass balance credits. Invest in blockchain or decentralized database middleware to ensure data interoperability with the upcoming EU CIRPASS standards.  
2. Solve the "Blend" Problem (R&D Priority):  
The reliance on poly-cotton blends is the single largest barrier to ESPR compliance. Inditex should aggressively scale its investment in chemical recycling technologies (like CIRC). Furthermore, the design teams must be re-trained on "Design for Disassembly" principles—creating garments where the zipper can be removed in seconds and the fabric is mono-material (100% cotton or 100% polyester) to facilitate mechanical recycling.  
3. Water Stewardship as a License to Operate:  
In the Turkey and Morocco clusters, simple compliance with "Green to Wear" discharge limits is no longer sufficient. Inditex should mandate Alliance for Water Stewardship (AWS) certification for all strategic mills in water-stressed basins. This moves the standard from "cleaning the water you use" to "ensuring the basin has enough water for everyone," providing a robust legal defense against CSDDD claims regarding resource depletion.  
4. Transitioning the Business Model:  
To mitigate the risk of the "Destruction of Unsold Goods" ban and the general regulatory hostility toward fast fashion, Inditex must accelerate its "Zara Pre-Owned" and repair platforms. By monetizing the service of repair and resale, the company can decouple revenue growth from the extraction of virgin resources. The goal should be to generate 10% of revenue from circular services by 2030, reducing the EPR liability exposure.  
5. Enhance Social Due Diligence in Proximity Hubs:  
Recognizing the pressure the "fast" model places on labor, Inditex should implement "Ring-fenced Labor Costing." This purchasing practice isolates the cost of labor in the negotiation price, ensuring that price pressure on suppliers does not erode wages. This demonstrates the "appropriate measures" required by CSDDD to prevent adverse social impacts.  
Conclusion:  
Inditex stands at the apex of the current fashion retail hierarchy. However, the regulatory environment of 2025-2030 is designed to dismantle the very mechanisms—speed, volume, disposability—that built that hierarchy. The "Risk Score of 68" is not an indictment of current negligence, but a forecast of future friction. The company's robust chemical management and vertical integration provide a strong foundation, but a successful transition requires a fundamental re-engineering of the product itself (materiality) and the data that accompanies it (transparency). The era of the "Digital Product Passport" demands that the shirt is no longer just a physical object, but a data container; Inditex's ability to fill that container with verified, granular, and circularity-compliant data will determine its future market access in Europe.

---

*End of RegulationRadar Report*`;

export default function BusinessSetup() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sector: "",
    scope: "",
    location: "",
    business_description: "",
  });
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    ce_certificate: null,
    esg_reports: null,
    sustainability_certs: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({ ...files, [type]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      // Save business data
      const { data: businessData, error: businessError } = await supabase
        .from("business_data")
        .insert({
          user_id: user.id,
          ...formData,
        })
        .select()
        .single();

      if (businessError) throw businessError;

      // Upload files to storage and save metadata
      for (const [fileType, file] of Object.entries(files)) {
        if (file) {
          const fileExt = file.name.split(".").pop();
          const fileName = `${user.id}/${Date.now()}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from("documents")
            .upload(fileName, file);

          if (uploadError) {
            console.error("File upload error:", uploadError);
          } else {
            const { data: { publicUrl } } = supabase.storage
              .from("documents")
              .getPublicUrl(fileName);

            await supabase.from("uploaded_files").insert({
              user_id: user.id,
              business_data_id: businessData.id,
              file_type: fileType,
              file_name: file.name,
              file_url: publicUrl,
            });
          }
        }
      }

      // Generate static report (hardcoded demo)
      const { data: report, error: reportError } = await supabase
        .from("reports")
        .insert({
          user_id: user.id,
          business_data_id: businessData.id,
          title: "RegulationRadar Analysis: Automated Compliance & Liability Assessment (Inditex S.A.)",
          report_markdown: REPORT_MARKDOWN,
          report_image_url: reportImage,
        })
        .select()
        .single();

      if (reportError) throw reportError;

      toast({
        title: "Success",
        description: "Business profile created and analysis generated!",
      });

      navigate(`/reports/${report.id}`);
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to process submission",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="border-b bg-card">
            <div className="flex h-16 items-center px-6">
              <SidebarTrigger />
              <h1 className="ml-4 text-2xl font-bold">Business Setup</h1>
            </div>
          </header>

          <div className="p-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Set Up Your Business Profile</CardTitle>
                <CardDescription>
                  Provide your business information to generate a compliance analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="sector">Sector</Label>
                      <Input
                        id="sector"
                        name="sector"
                        placeholder="e.g., Textile Manufacturing"
                        value={formData.sector}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scope">Scope</Label>
                      <Input
                        id="scope"
                        name="scope"
                        placeholder="e.g., Scope 1, 2, 3"
                        value={formData.scope}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="e.g., Spain, EU"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business_description">Business Description</Label>
                    <Textarea
                      id="business_description"
                      name="business_description"
                      placeholder="Describe your business operations, supply chain, and compliance focus areas..."
                      value={formData.business_description}
                      onChange={handleInputChange}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Upload Documents</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="ce_certificate">CE Certificate</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="ce_certificate"
                          type="file"
                          onChange={(e) => handleFileChange(e, "ce_certificate")}
                          accept=".pdf,.doc,.docx"
                        />
                        <Upload className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="esg_reports">ESG Reports</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="esg_reports"
                          type="file"
                          onChange={(e) => handleFileChange(e, "esg_reports")}
                          accept=".pdf,.doc,.docx"
                        />
                        <Upload className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sustainability_certs">Sustainability Certificates</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="sustainability_certs"
                          type="file"
                          onChange={(e) => handleFileChange(e, "sustainability_certs")}
                          accept=".pdf,.doc,.docx"
                        />
                        <Upload className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Processing..." : "Submit & Generate Analysis"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
