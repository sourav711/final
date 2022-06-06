using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cg_docs.Models;
using cg_docs.RequestModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Net.Mime;
using Microsoft.AspNetCore.StaticFiles;
using System.Reflection.Metadata;
using Microsoft.CodeAnalysis;

namespace cg_docs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentController : ControllerBase
    {
        private readonly cgdocsContext _cgcontext;
        private IHostingEnvironment _environment;
        public DocumentController(cgdocsContext project, IHostingEnvironment env)
        {
            _cgcontext = project;
            _environment = env;
        }


        [HttpGet]
        public IActionResult Get()
        {
            var getInfo = _cgcontext.Documents.ToList();
            return Ok(getInfo);
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _cgcontext.Documents.Where(obj => obj.FolderId == id);

                if (result == null) return NotFound();

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }


        // POST: api/PlayersInfo
        [HttpPost]
        public void Post([FromBody] DocumentRequest value)
        {
            try
            {
                Documents obj = new Documents();
                obj.DocumentName = value.DocumentName;
                obj.ContentType = value.ContentType;
                obj.Size = value.Size;
                obj.CreatedAt = value.CreatedAt;
                obj.CreatedBy = value.CreatedBy;
                obj.IsDeleted = value.IsDeleted;
                obj.FolderId = value.FolderId;
                _cgcontext.Documents.Add(obj);
                _cgcontext.SaveChanges();
            }
            catch (Exception)
            {
              
            }

        }
        [HttpPost]
        [Route("upload")]
        public async Task<ActionResult> Upload(List<IFormFile> files)
        {
            long size = files.Sum(f => f.Length);
            var rootPath = Path.Combine(_environment.ContentRootPath, "Resources", "Documents");
            if (!Directory.Exists(rootPath))
                Directory.CreateDirectory(rootPath);
            foreach (var file in files)
            {
                var filePath = Path.Combine(rootPath, file.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    var Documents = new Documents
                    {
                        DocumentName = file.FileName,
                        ContentType = file.ContentType,
                        Size = file.Length,
                



                    };
                    await file.CopyToAsync(stream);
                    _cgcontext.Documents.Add(Documents);
                    await _cgcontext.SaveChangesAsync();
                }
            }
            return Ok(new { count = files.Count, size });
        }
        [HttpPost]
        [Route("download/{id}")]
        public async Task<ActionResult> Download(int id)
        {
            try
            {
                var provider = new FileExtensionContentTypeProvider();
                var document = _cgcontext.Documents.FirstOrDefault(o => o.DocumentId == id);
                if (document == null)
                    return NotFound();
                var file = Path.Combine(_environment.ContentRootPath, "Resources", "Documents", document.DocumentName);
                string contentType;
                if (!provider.TryGetContentType(file, out contentType))
                {
                    contentType = "application/octet-stream";
                }

                byte[] fileBytes;
                if (System.IO.File.Exists(file))
                {
                    fileBytes = System.IO.File.ReadAllBytes(file);
                }
                else
                {
                    return NotFound();
                }
                return File(fileBytes, contentType, document.DocumentName);
            }
            catch (Exception e)
            {

            }
            return null;
        }


        [HttpGet("{value}")]
        public IActionResult Get(string value)
        {

            var result = _cgcontext.Documents.Where(obj => obj.DocumentName.Contains(value));
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var matches = _cgcontext.Documents.Where(res => res.DocumentId == id).ToList();
            matches.ForEach(res => _cgcontext.Documents.Remove(res));
            _cgcontext.SaveChanges();

        }
        [HttpGet("{value},{id:int},{userid:int}")]
        public IActionResult Get(string value, int id,int userid)
        {

            var result = _cgcontext.Documents.Where(e=>e.CreatedBy==userid).Where(o => o.FolderId == id).Where(obj => obj.DocumentName.Contains(value));
            return Ok(result);
        }
    }
}
