/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const TemplateDesign = ({ type }) => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const get_templates = async () => {
      try {
        const { data } = await api.get("/api/templates");
        setTemplates(data.templates);
      } catch (error) {
        console.log(error);
      }
    };
    get_templates();
  }, []);

  const add_template = async (id) => {
    try {
      const { data } = await api.get(`/api/add-user-template/${id}`);
      navigate(`/design/${data.design?._id}/edit`);
    } catch (error) {
      console.log(error);
    }
  };

  const create_new_design = async () => {
    try {
      const { data } = await api.post("/api/create-user-design", {
        // Optional: Pass any initial data for the new design
      });
      navigate(`/design/${data.design?._id}/edit`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mb-4">
        <button
          onClick={create_new_design}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create New Template
        </button>
      </div>
      <div
        className={`grid gap-2 ${type ? "grid-cols-2" : "grid-cols-4 mt-5"}`}
      >
        {templates.map((design, i) => (
          <div
            onClick={() => add_template(design._id)}
            className={`relative cursor-pointer group w-full  ${
              type ? "h-[100px]" : " h-[170px] px-2"
            }`}
          >
            <div
              className={`w-full h-full block bg-[#ffffff12] rounded-md ${
                type ? "" : "p-4"
              }`}
            >
              <img
                className="w-full h-full rounded-md overflow-hidden"
                src={design.image_url}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TemplateDesign;
