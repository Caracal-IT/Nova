using System;
using System.Threading.Tasks;

namespace Caracal.Web.Nova.SmartObject.Repositories {
    public interface SmartObjectRepository {
        Task SaveAsync(string name, string smartObject);
        Task<string> GetSmartObjectAsync(string name, int id);
    }
}