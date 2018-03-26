using System.Threading.Tasks;

namespace Caracal.Web.Nova.Builder.Repositories {
  public interface ShapesRepository {
    Task SaveProcessAsync(string process);
    Task<string> GetProcessAsync(string name);
  }
}